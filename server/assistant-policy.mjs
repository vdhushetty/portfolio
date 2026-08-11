const codingRequest =
  /\b(write|give|generate|create|show|provide|build|make|implement|debug|fix|solve)\b[\s\S]{0,100}\b(code|coding|script|function|program|query|regex|algorithm)\b/i;
const profileAnchor =
  /\b(venkat|portfolio|project|experience|background|resume|role fit|capabilit(?:y|ies)|skills?|credentials?|certifications?|worked|built|implemented|your|his|he)\b/i;
const profileIntroduction = /\b(who are you|tell me about yourself)\b/i;

const technologyNames = [
  "Python",
  "PySpark",
  "SQL",
  "JavaScript",
  "TypeScript",
  "Databricks",
  "Power BI",
  "machine learning",
  "data engineering",
];

export function profileScopeResponse(question) {
  const input = String(question || "");
  if (codingRequest.test(input)) {
    return {
      evidence: "unknown",
      answer:
        "I can only answer questions about Venkat Sai Dhushetty's published projects, experience, skills, credentials, and role fit. I can't generate, debug, or solve coding tasks. Ask how Venkat has used a technology in his documented work instead.",
    };
  }
  if (profileAnchor.test(input) || profileIntroduction.test(input)) return null;
  const technology = technologyNames.find((name) =>
    input.toLowerCase().includes(name.toLowerCase())
  );
  return {
    evidence: "unknown",
    answer:
      "I can only answer questions about Venkat Sai Dhushetty's published projects, experience, skills, credentials, and role fit. " +
      (technology
        ? `For ${technology}, ask how Venkat has used it in his documented work.`
        : "Please rephrase your question so it is specifically about Venkat."),
  };
}
