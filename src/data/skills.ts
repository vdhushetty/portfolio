export type Skill = {
  name: string;
  icon: string; // path under /icons/skills/
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Query",
    skills: [
      { name: "Python", icon: "/icons/skills/python.svg" },
      { name: "MSSQL / T-SQL", icon: "/icons/skills/mssql.svg" },
      { name: "PySpark", icon: "/icons/skills/pyspark.svg" },
      { name: "DAX", icon: "/icons/skills/dax.svg" },
      { name: "Excel", icon: "/icons/skills/excel.svg" },
      { name: "Git", icon: "/icons/skills/git.svg" },
    ],
  },
  {
    title: "Cloud & Platforms",
    skills: [
      { name: "Databricks", icon: "/icons/skills/databricks.svg" },
      { name: "Azure Data Factory", icon: "/icons/skills/adf.svg" },
      { name: "Azure Synapse", icon: "/icons/skills/synapse.svg" },
      { name: "Microsoft Fabric", icon: "/icons/skills/fabric.svg" },
      { name: "Cosmos DB", icon: "/icons/skills/cosmosdb.svg" },
      { name: "Azure", icon: "/icons/skills/azure.svg" },
    ],
  },
  {
    title: "Data Engineering",
    skills: [
      { name: "Apache Spark", icon: "/icons/skills/spark.svg" },
      { name: "Apache Kafka", icon: "/icons/skills/kafka.svg" },
      { name: "Hadoop", icon: "/icons/skills/hadoop.svg" },
      { name: "Delta Live Tables", icon: "/icons/skills/dlt.svg" },
      { name: "Auto Loader", icon: "/icons/skills/autoloader.svg" },
      { name: "Medallion Architecture", icon: "/icons/skills/medallion.svg" },
      { name: "ETL patterns", icon: "/icons/skills/etl.svg" },
      { name: "Data modeling", icon: "/icons/skills/modeling.svg" },
    ],
  },
  {
    title: "Governance & Quality",
    skills: [
      { name: "Unity Catalog", icon: "/icons/skills/unity-catalog.svg" },
      { name: "Data Lineage", icon: "/icons/skills/lineage.svg" },
      { name: "Metadata", icon: "/icons/skills/metadata.svg" },
      { name: "Data Quality", icon: "/icons/skills/quality.svg" },
      { name: "Access Control", icon: "/icons/skills/access.svg" },
    ],
  },
  {
    title: "Analytics & BI",
    skills: [
      { name: "Power BI", icon: "/icons/skills/powerbi.svg" },
      { name: "SSMS", icon: "/icons/skills/ssms.svg" },
      { name: "Pandas", icon: "/icons/skills/pandas.svg" },
      { name: "Matplotlib", icon: "/icons/skills/matplotlib.svg" },
      { name: "Jupyter", icon: "/icons/skills/jupyter.svg" },
      { name: "A/B testing", icon: "/icons/skills/abtest.svg" },
    ],
  },
  {
    title: "Data Science & ML",
    skills: [
      { name: "scikit-learn", icon: "/icons/skills/scikitlearn.svg" },
      { name: "TensorFlow", icon: "/icons/skills/tensorflow.svg" },
      { name: "PyTorch", icon: "/icons/skills/pytorch.svg" },
      { name: "Transformers", icon: "/icons/skills/transformers.svg" },
      { name: "NLP", icon: "/icons/skills/nlp.svg" },
      { name: "Feature engineering", icon: "/icons/skills/features.svg" },
      { name: "Model deployment", icon: "/icons/skills/deploy.svg" },
      { name: "Hugging Face", icon: "/icons/skills/huggingface.svg" },
    ],
  },
];
