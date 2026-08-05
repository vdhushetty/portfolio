export type Certification = {
  name: string;
  date: string;
  image: string;
  link: string;
};

const MS_BADGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='16' fill='%230078D4'/%3E%3Ctext x='60' y='55' text-anchor='middle' fill='white' font-size='14' font-weight='700' font-family='sans-serif'%3EAzure%3C/text%3E%3Ctext x='60' y='78' text-anchor='middle' fill='%23BFDBFE' font-size='11' font-family='sans-serif'%3EAssociate%3C/text%3E%3C/svg%3E";
const DB_BADGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='16' fill='%23FF3621'/%3E%3Ctext x='60' y='55' text-anchor='middle' fill='white' font-size='12' font-weight='700' font-family='sans-serif'%3EDatabricks%3C/text%3E%3Ctext x='60' y='78' text-anchor='middle' fill='%23FED7AA' font-size='11' font-family='sans-serif'%3EAssociate%3C/text%3E%3C/svg%3E";

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
