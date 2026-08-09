import { loadLocalEnv } from "../server/load-env.mjs";

loadLocalEnv();
const { mutateState, readState } = await import("../server/storage.mjs");

const approvedMethods = new Set([
  "LinkedIn identity reviewed",
  "Work email and relationship confirmed",
  "Published LinkedIn recommendation",
]);

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : "";
}

const [action = "list", id = ""] = process.argv.slice(2);
if (action === "list") {
  const state = await readState();
  const rows = state.attestations.map((item) => ({
    id: item.id,
    status: item.status,
    name: item.name,
    role: item.role,
    company: item.company,
    submittedAt: item.submittedAt,
  }));
  console.table(rows);
  process.exit(0);
}

if (!id || !["approve", "reject"].includes(action)) {
  throw new Error(
    "Use: attestations:review -- list | approve <id> --method <method> | reject <id>"
  );
}

const method = argument("--method");
if (action === "approve" && !approvedMethods.has(method)) {
  throw new Error(
    "Approved methods: " + Array.from(approvedMethods).join("; ")
  );
}

const result = await mutateState((state) => {
  const item = state.attestations.find((entry) => entry.id === id);
  if (!item) throw new Error("Recommendation not found: " + id);
  item.status = action === "approve" ? "approved" : "rejected";
  item.verificationMethod = action === "approve" ? method : null;
  item.verifiedAt = action === "approve" ? new Date().toISOString() : null;
  return { id: item.id, status: item.status };
});

console.log("Recommendation " + result.id + " is now " + result.status + ".");
