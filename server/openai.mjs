import { HttpError } from "./http.mjs";

function apiKey() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new HttpError(503, "AI_NOT_CONFIGURED", "The profile assistant is not configured.");
  }
  return key;
}

async function openaiRequest(path, body) {
  const response = await fetch("https://api.openai.com/v1/" + path, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 429) {
      throw new HttpError(
        503,
        "AI_CAPACITY_LIMIT",
        "The profile assistant is temporarily at capacity. Please try again later."
      );
    }
    throw new HttpError(
      502,
      "AI_PROVIDER_ERROR",
      "The profile assistant could not complete the request."
    );
  }
  return data;
}

export async function moderateText(input) {
  const data = await openaiRequest("moderations", {
    model: "omni-moderation-latest",
    input,
  });
  if (data.results?.[0]?.flagged) {
    throw new HttpError(
      400,
      "CONTENT_BLOCKED",
      "That message cannot be processed. Please rephrase it professionally."
    );
  }
}

function outputText(response) {
  return (response.output || [])
    .filter((item) => item.type === "message")
    .flatMap((item) => item.content || [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

function parseAnswer(text) {
  const evidenceMatch = text.match(/(?:^|\n)EVIDENCE:\s*(direct|adjacent|unknown)/i);
  const answerMatch = text.match(/(?:^|\n)ANSWER:\s*([\s\S]*)$/i);
  return {
    evidence: evidenceMatch ? evidenceMatch[1].toLowerCase() : "unknown",
    answer: (answerMatch ? answerMatch[1] : text)
      .replace(/(?:^|\n)EVIDENCE:\s*(direct|adjacent|unknown)/gi, "")
      .trim(),
  };
}

export async function generateProfileAnswer({
  question,
  context,
  history,
  safetyIdentifier,
}) {
  const instructions = [
    "You are the AI profile assistant for Venkat Sai Dhushetty's portfolio.",
    "Write in Venkat's first-person voice, but never imply that you are Venkat or a live human.",
    "Use only the supplied published profile context for direct experience claims.",
    "Classify every answer as one evidence tier:",
    "direct - the context explicitly documents relevant project, role, credential, or capability evidence.",
    "adjacent - the question is related to technology, data engineering, data analysis, data science, AI, ML, cloud, or software, but the context does not document direct project experience. In this case say that I have working knowledge or understand how it is used, and clearly say that the portfolio does not show a direct project example.",
    "unknown - the question is unrelated to those professional domains or cannot be supported. Say that the published profile does not establish the answer.",
    "Never convert adjacent knowledge into claimed production experience. Never invent employers, dates, metrics, credentials, tools, projects, or personal details.",
    "A matching technology keyword alone does not make the requested task direct evidence. The task or use case itself must be documented.",
    "Answer only questions about Venkat Sai Dhushetty's published projects, experience, skills, credentials, capabilities, and role fit.",
    "Do not answer unrelated general-knowledge questions and do not act as a code generator, debugger, homework solver, or utility assistant. Refuse every request to write, generate, debug, or solve code, even when it mentions a portfolio technology or project. Classify these refusals as unknown.",
    "Prefer concise answers. When direct evidence exists, reference the relevant project titles naturally.",
    "Return exactly this format:",
    "EVIDENCE: direct|adjacent|unknown",
    "ANSWER: your answer",
  ].join("\n");

  const input = [
    "PUBLISHED PROFILE CONTEXT:",
    JSON.stringify(context),
    history ? "RECENT CONVERSATION:\n" + history : "",
    "VISITOR QUESTION:",
    question,
  ]
    .filter(Boolean)
    .join("\n\n");

  const response = await openaiRequest("responses", {
    model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
    instructions,
    input,
    max_output_tokens: 450,
    reasoning: { effort: "low" },
    text: { verbosity: "low" },
    safety_identifier: safetyIdentifier.slice(0, 64),
    store: false,
  });
  const text = outputText(response);
  if (!text) {
    throw new HttpError(502, "AI_EMPTY_RESPONSE", "The profile assistant returned no answer.");
  }
  return parseAnswer(text);
}
