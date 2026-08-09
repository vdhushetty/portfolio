import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(
  process.env.PORTFOLIO_DATA_DIR || path.join(root, ".data"),
  "portfolio-state.json"
);
const isProduction = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL;

export class StorageConfigurationError extends Error {}

function emptyState() {
  return {
    visitors: {},
    analytics: {},
    rateLimits: {},
    conversations: {},
    messages: [],
    aiConversations: {},
    attestations: [],
    attestationInvites: {},
  };
}

function normalizeState(value) {
  return { ...emptyState(), ...(value || {}) };
}

let fileQueue = Promise.resolve();
let pool;
let databaseReady;

function getPool() {
  if (!databaseUrl) return null;
  if (!pool) {
    const remote = !/localhost|127\.0\.0\.1/i.test(databaseUrl);
    pool = new pg.Pool({
      connectionString: databaseUrl,
      ssl: remote ? { rejectUnauthorized: false } : undefined,
      max: 4,
    });
  }
  return pool;
}

async function ensureDatabase() {
  const db = getPool();
  if (!db) return null;
  if (!databaseReady) {
    databaseReady = db.query(
      "CREATE TABLE IF NOT EXISTS portfolio_state (" +
        "key TEXT PRIMARY KEY, " +
        "value JSONB NOT NULL, " +
        "updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()" +
      ")"
    );
  }
  await databaseReady;
  return db;
}

async function readLocal() {
  try {
    return normalizeState(JSON.parse(await fs.readFile(dataFile, "utf8")));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return emptyState();
  }
}

async function writeLocal(state) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  const temporary = dataFile + "." + process.pid + ".tmp";
  await fs.writeFile(temporary, JSON.stringify(state, null, 2), "utf8");
  await fs.rename(temporary, dataFile);
}

function assertStorageAvailable() {
  if (isProduction && !databaseUrl) {
    throw new StorageConfigurationError(
      "DATABASE_URL is required in production for durable portfolio features."
    );
  }
}

export async function readState() {
  assertStorageAvailable();
  const db = await ensureDatabase();
  if (!db) return readLocal();
  const result = await db.query(
    "SELECT value FROM portfolio_state WHERE key = $1",
    ["primary"]
  );
  return normalizeState(result.rows[0]?.value);
}

export async function mutateState(mutator) {
  assertStorageAvailable();
  const db = await ensureDatabase();
  if (db) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO portfolio_state (key, value) VALUES ($1, $2::jsonb) " +
          "ON CONFLICT (key) DO NOTHING",
        ["primary", JSON.stringify(emptyState())]
      );
      const current = await client.query(
        "SELECT value FROM portfolio_state WHERE key = $1 FOR UPDATE",
        ["primary"]
      );
      const state = normalizeState(current.rows[0]?.value);
      const result = await mutator(state);
      await client.query(
        "UPDATE portfolio_state SET value = $2::jsonb, updated_at = NOW() WHERE key = $1",
        ["primary", JSON.stringify(state)]
      );
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  const operation = fileQueue.then(async () => {
    const state = await readLocal();
    const result = await mutator(state);
    await writeLocal(state);
    return result;
  });
  fileQueue = operation.catch(() => {});
  return operation;
}

export function storageMode() {
  if (databaseUrl) return "postgres";
  return isProduction ? "unavailable" : "local-json";
}
