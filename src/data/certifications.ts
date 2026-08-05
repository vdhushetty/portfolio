export type Certification = {
  name: string;
  date: string;
  image: string;
  link: string;
};

function badge(bg: string, line1: string, line2: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<rect width="120" height="120" rx="18" fill="${bg}"/>` +
    `<circle cx="60" cy="42" r="18" fill="none" stroke="#fff" stroke-width="3" opacity="0.9"/>` +
    `<path d="M60 30v12l8 5" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>` +
    `<text x="60" y="78" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="ui-sans-serif,system-ui,sans-serif">${line1}</text>` +
    `<text x="60" y="96" text-anchor="middle" fill="#ffffffcc" font-size="11" font-family="ui-sans-serif,system-ui,sans-serif">${line2}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const MS_BADGE = badge("#0078D4", "Azure", "Associate");
const DB_BADGE = badge("#FF3621", "Databricks", "Associate");

export const certifications: Certification[] = [
  {
    name: "Microsoft Azure AI Engineer Associate",
    date: "November 2025",
    image: MS_BADGE,
    link: "https://learn.microsoft.com/en-us/users/venkatsaidhushetty-7235/transcript/7oj29cq635nwl95",
  },
  {
    name: "Databricks Data Engineer Associate",
    date: "April 2024",
    image: DB_BADGE,
    link: "https://credentials.databricks.com/d8b38b68-a2b3-4533-9e5c-671862730734#gs.aqy8yu",
  },
  {
    name: "Microsoft Azure Data Scientist Associate DP-100",
    date: "December 2023",
    image: MS_BADGE,
    link: "https://learn.microsoft.com/en-us/users/venkatsaidhushetty-2506/credentials/82571ccd8369da80",
  },
];
