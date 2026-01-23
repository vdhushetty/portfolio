export const projectsData = [
  {
    id: "d365-finance-operations-replication",
    title: "D365 Finance & Operations Real-Time Data Replication",
    description: "Enterprise-scale real-time data replication from Dynamics 365 F&O to Azure Databricks using Azure Synapse Link and Auto Loader with 93% cost reduction",
    logo: "/Images/projects/Realtime/data_replication.png",
    architecture: "/Images/projects/Realtime/Realtime_replication_Architecture.png",
    fullDescription:
      "Designed and implemented a high-performance real-time data replication system that streams data from Dynamics 365 Finance & Operations to Azure Databricks Delta Lake. The solution leverages Azure Synapse Link for efficient CDC (Change Data Capture) capabilities and Auto Loader for intelligent data ingestion, enabling analytics teams to access updated D365 data with minimal latency. The architecture was optimized through iterative refinement to dramatically reduce infrastructure costs while maintaining data freshness and system reliability.",
    tech: ["D365 Finance", "Azure Synapse Link", "Auto Loader", "Delta Lake", "Python"],
    technologies: ["Dynamics 365 Finance & Operations", "Azure Synapse Link", "Azure Data Factory", "Databricks Auto Loader", "Delta Lake", "PySpark", "Azure Monitor", "KQL Query", "Python"],
    image: "https://via.placeholder.com/300x200?text=D365+Replication",
    metrics: [
      { label: "Cost Reduction", value: "93%", description: "From $1,500 to $100 daily" },
      { label: "Availability", value: "99.9%", description: "Sub-minute data freshness" },
      { label: "Tables Processed", value: "1,500+", description: "Across Azure regions" },
      { label: "Data Loss", value: "Zero", description: "Exactly-once semantics" },
    ],
    problem:
      "The organization needed real-time access to D365 F&O data for analytics, but existing solutions were either too expensive or didn't provide sufficient data freshness. Managing concurrent streaming operations at scale, handling RocksDB concurrency constraints during parallel ingestion, detecting stream idle states, and architecting a cost-effective solution while maintaining SLA requirements were the primary challenges.",
    solution:
      "We implemented a sophisticated multi-stage pipeline: D365 F&O data flows through Azure Synapse Link into Azure Data Lake with CDC enabled, Auto Loader intelligently detects and processes new/modified files with automatic schema handling, PySpark jobs perform incremental transformations and load data into Delta Lake tables, and parallel streaming handles 1,500+ tables without bottlenecks. The cost optimization breakthrough came from event-driven scaling rather than maintaining baseline capacity—by tuning cluster startup/shutdown timings, optimizing batch intervals, and right-sizing executor configurations, we achieved 93% cost reduction while improving data freshness and reliability.",
    features: [
      "Real-time Change Data Capture from D365 F&O via Azure Synapse Link with sub-minute latency",
      "Intelligent incremental loading using Databricks Auto Loader with schema evolution support",
      "Parallel streaming pipelines processing 1,500+ tables across multiple Azure regions",
      "Advanced data validation framework comparing source and target tables for consistency",
      "Comprehensive Azure Monitor alerting with KQL queries for production monitoring",
      "Optimized cluster management reducing daily costs from $1,500 to $100 (93% reduction)",
      "Automated checkpoint management preventing data duplication and ensuring exactly-once semantics",
      "Delta Lake optimization with automatic compaction and vacuuming for storage efficiency",
    ],
    challenges:
      "Managing concurrent streaming operations at scale, handling RocksDB concurrency constraints during parallel ingestion, detecting stream idle states for cost optimization, and architecting a cost-effective solution that maintained SLA requirements. We solved parallel streaming bottlenecks by implementing sophisticated concurrency controls and task distribution logic. RocksDB errors were resolved through optimized checkpoint management and batch size tuning. Stream idle detection was addressed with intelligent cluster autoscaling policies that spin down unused resources within minutes rather than maintaining constant capacity. The most impactful optimization involved restructuring the cluster architecture from large persistent clusters to event-driven autoscaling with dynamic resource allocation.",
    duration: "6 months",
    role: "Lead Data Engineer",
    team: "4 engineers",
    status: "Completed - In Active Production",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: "databricks-disaster-recovery",
    title: "Databricks Disaster Recovery Setup",
    description: "Enterprise-grade disaster recovery solution using Databricks Delta Sharing and DeepClone for data replication and failover",
    logo: "/Images/projects/DR/disaster-recovery-icon.jpg",
    fullDescription:
      "Designed and implemented a comprehensive disaster recovery (DR) architecture for Databricks workspaces using Delta Sharing, DeepClone, and CLI-based health monitoring. The solution ensures continuous data replication from primary to secondary workspace, enables seamless failover when the primary workspace is unavailable, and automatically resumes normal operations upon recovery. This multi-step process maintains data integrity, minimizes downtime, and provides proactive monitoring of both environments.",
    tech: ["Databricks", "Delta Sharing", "DeepClone", "CLI", "Python"],
    technologies: ["Databricks", "Delta Lake", "Delta Sharing", "DeepClone", "Python CLI", "Fabric", "SQL"],
    image: "https://via.placeholder.com/300x200?text=Databricks+DR",
    metrics: [
      { label: "Uptime", value: "99.9%", description: "Continuous availability" },
      { label: "RPO", value: "<1 hour", description: "Recovery Point Objective" },
      { label: "RTO", value: "30 mins", description: "Recovery Time Objective" },
      { label: "Data Loss", value: "Zero", description: "Zero data loss verified" },
    ],
    problem:
      "Organizations running critical analytics on Databricks needed a robust disaster recovery solution to ensure business continuity. The challenge was designing a system that could continuously replicate data from primary to secondary workspace, automatically detect failures, seamlessly failover workloads, and restore normal operations—all while maintaining zero data loss and minimal downtime.",
    solution:
      "We implemented a four-phase orchestration system: (1) Data Replication - Delta Sharing securely shares primary data with automatic DeepClone copying into secondary catalogs, (2) Failover Activation - CLI monitors detect primary unavailability and pause replication while resuming secondary workflows, (3) Primary Recovery - Reverse DeepClone syncs changes back to primary with data consistency checks, (4) Normal Operations - Resume regular replication schedule with continuous health monitoring. This multi-step process ensures business continuity with automated failover and recovery.",
    features: [
      "Real-time data replication via Delta Sharing from primary to secondary workspace",
      "DeepClone workflows creating independent, consistent datasets every 6 hours",
      "CLI-based health monitoring for primary workspace availability and performance",
      "Automated failover activation when primary workspace becomes unavailable",
      "Reverse sync capabilities to restore data consistency after primary recovery",
      "Fabric shortcut automation for seamless reporting and dashboard failover",
      "Multi-step orchestration ensuring zero data loss and minimal downtime",
    ],
    challenges:
      "Ensuring data consistency across primary and secondary workspaces during replication, preventing conflicts during failover and recovery, and orchestrating complex multi-step workflows. We solved these by implementing DeepClone for independent data copies, using Delta Sharing for secure read-only access, and building a sophisticated CLI monitor with state management to orchestrate the entire DR lifecycle.",
    duration: "4 months",
    role: "Data Architect & Engineer",
    team: "4 engineers",
    status: "Completed",
    liveUrl: null,
    githubUrl: null,
    steps: [
      {
        title: "Step 1: Data Replication from Primary to Secondary Workspace",
        description:
          "Ensure all critical data from the primary Databricks workspace is continuously available in the secondary workspace for disaster recovery purposes, while monitoring the health of the primary environment.",
        details: [
          "Primary Workspace Workflows: All workflows continue running normally in the primary workspace",
          "Delta Sharing: Data from primary catalogs is shared with the secondary Databricks workspace via Delta Sharing, allowing secure, real-time access to primary data without full duplication",
          "DeepClone Workflows: In the secondary workspace, DeepClone workflows copy the Delta-shared tables into secondary catalogs, creating independent, consistent datasets",
          "CLI Health Monitor: A CLI-based monitor continuously checks the health of the primary Databricks workspace, verifying availability of critical clusters and workflows, and triggering alerts on failures",
        ],
        keyPoints: [
          "Delta Sharing ensures secure, read-only access to primary data without impacting production workloads",
          "DeepClone workflows guarantee full data integrity in the secondary workspace",
          "CLI Health Monitor provides real-time visibility into primary workspace health",
        ],
        image: "/Images/projects/DR/Items.png",
      },
      {
        title: "Step 2: Failover Activation",
        description:
          "Ensure business continuity by switching all workloads to the secondary Databricks workspace when the primary workspace is unavailable.",
        details: [
          "CLI Health Monitor continuously checks the primary workspace health",
          "Failover Trigger: When the CLI monitor detects that the primary workspace is down, failover is initiated",
          "Delta Sharing from Primary → Secondary is stopped to prevent data inconsistencies",
          "DeepClone workflows in the secondary workspace are paused to avoid conflicts during failover",
          "Other workflows in the secondary workspace are resumed, allowing secondary to take over active processing",
          "Fabric shortcuts are altered via APIs through the CLI monitor to reflect failover changes in reports and dashboards",
        ],
        keyPoints: [
          "Ensures minimal downtime by switching operations to the secondary workspace",
          "Protects data integrity by pausing replication jobs and stopping delta sharing",
          "Secondary workspace becomes fully operational until the primary is restored",
        ],
        image: "/Images/projects/DR/Items-2.png",
      },
      {
        title: "Step 3: Primary Recovery and Reverse Sync",
        description:
          "Safely resume operations in the primary workspace once it becomes available, ensuring data consistency with the secondary workspace.",
        details: [
          "CLI Health Monitor detects that the primary workspace is back online",
          "Workflows in the secondary workspace are paused to prevent data conflicts",
          "Reverse DeepClone jobs are initiated from the secondary workspace back to the primary catalogs, ensuring all changes made during failover are synchronized",
          "Once reverse DeepClone jobs complete successfully, the primary workspace resumes normal workflows",
          "Data replication resumes from the primary workspace to secondary catalogs via Delta Sharing",
        ],
        keyPoints: [
          "Guarantees data consistency by synchronizing any updates made in the secondary workspace back to the primary",
          "Prevents conflicts and ensures smooth transition of workloads back to primary",
          "CLI monitor ensures the primary is fully healthy before resuming its workflows",
        ],
        image: "/Images/projects/DR/Items-3.png",
      },
      {
        title: "Step 4: Normal Operations and Ongoing Replication",
        description:
          "Restore the disaster recovery architecture to its normal state, ensuring continuous replication and data availability between primary and secondary workspaces.",
        details: [
          "Delta Sharing from the primary workspace to secondary workspace is resumed",
          "DeepClone workflows in the secondary workspace are restarted on their regular schedule (every 6 hours) to maintain updated copies of primary catalogs",
          "All workflows in the primary workspace continue running as normal",
          "Fabric shortcuts are switched back to point to the primary workspace storage account, ensuring all reports and dashboards reflect the primary environment",
          "CLI Health Monitor continues to monitor both workspaces, ensuring early detection of any issues",
        ],
        keyPoints: [
          "Ensures continuous data replication and disaster recovery readiness",
          "Maintains data integrity and consistency between primary and secondary workspaces",
          "Ensures reporting accuracy by switching Fabric shortcuts back to the primary storage",
          "Provides proactive monitoring to detect potential failures before they impact operations",
        ],
        image: "/Images/projects/DR/Items-4.png",
      },
    ],
  },
];
