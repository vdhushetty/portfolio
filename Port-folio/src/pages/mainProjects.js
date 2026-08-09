const documented = {
  label: "Portfolio documented",
  source: "GitHub main project catalog",
  detail: "Project scope and outcomes are self-reported and have not been independently audited.",
};

const academic = {
  label: "Academic project",
  source: "GitHub main project catalog",
  detail: "Academic project summary; metrics reflect the recorded evaluation results.",
};

export const mainProjectAliases = {
  "synapse-to-databricks-migration": "synapse-databricks-migration",
  "d365-byod-recovery": "d365-data-retention",
  "lindsay-medallion-sales": "lindsay-enterprise-dashboards",
};

export const mainProjects = [
  {
    id: "unity-catalog-governance",
    domain: "de",
    short: "Unity Catalog Governance",
    tagline: "Centralized access control, lineage, and metadata for a governed lakehouse.",
    title: "Unity Catalog Governance & Lakehouse Access Control",
    description:
      "A governed Databricks lakehouse model for centralized permissions, discoverability, ownership, and end-to-end lineage.",
    fullDescription:
      "Designed a Unity Catalog governance approach that organizes data products by catalog and schema, assigns ownership, applies least-privilege access, and makes lineage and metadata visible to engineering and analytics teams.",
    tech: ["Unity Catalog", "Databricks", "Delta Lake", "RBAC"],
    technologies: ["Databricks Unity Catalog", "Delta Lake", "SQL", "Role-based access control", "Data lineage"],
    metrics: [
      { label: "Control plane", value: "UC", description: "centralized governance" },
      { label: "Lineage", value: "End-to-end", description: "data-product traceability" },
    ],
    problem:
      "Workspace-level permissions and inconsistent ownership made it difficult to understand who could access data, where it came from, and which team was accountable for it.",
    solution:
      "A catalog-first operating model standardized naming, ownership, grants, and environment boundaries while Unity Catalog provided a shared permission and lineage layer.",
    features: [
      "Catalog and schema structure aligned to data domains and environments",
      "Least-privilege group grants instead of individual access",
      "Discoverable ownership, descriptions, and lineage",
      "Controlled access to production data products",
    ],
    status: "Production",
    role: "Data Engineer",
    team: "Cross-functional data platform team",
    impactHighlight: "Governed lakehouse",
    evidence: documented,
    arch: [
      { title: "Sources", note: "registered assets", items: [{ logo: "deltalake", label: "Delta" }] },
      { title: "Govern", in: "policies", note: "grants + lineage", items: [{ logo: "databricks", label: "Unity Catalog" }] },
      { title: "Consume", in: "approved access", note: "auditable", items: [{ logo: "dashboard", label: "Data teams" }] },
    ],
  },
  {
    id: "event-hub-delta-streaming",
    domain: "de",
    short: "Event Hub Streaming",
    tagline: "Near-real-time event ingestion from Azure Event Hubs into Delta Lake.",
    title: "Event Hub to Delta Streaming Ingestion",
    description:
      "A resilient streaming path that captures Event Hub data, applies schema-aware processing, and lands queryable Delta tables.",
    fullDescription:
      "Built a structured-streaming ingestion pattern for Azure Event Hubs and Delta Lake, separating raw capture from validated processing so events remain replayable and downstream consumers receive consistent tables.",
    tech: ["Event Hubs", "Databricks", "Spark Streaming", "Delta Lake"],
    technologies: ["Azure Event Hubs", "Databricks Structured Streaming", "PySpark", "Delta Lake", "Checkpointing"],
    metrics: [
      { label: "Mode", value: "Streaming", description: "continuous ingestion" },
      { label: "Store", value: "Delta", description: "replayable lakehouse tables" },
    ],
    problem:
      "Operational events needed to reach analytics quickly without sacrificing replayability, schema control, or recovery after interruptions.",
    solution:
      "Structured Streaming consumes Event Hub partitions with checkpoints, persists raw events, and incrementally merges validated records into Delta tables.",
    features: [
      "Checkpointed, restart-safe event consumption",
      "Raw event retention for replay and investigation",
      "Schema validation and quarantine handling",
      "Incremental Delta writes for downstream analytics",
    ],
    status: "Production",
    role: "Data Engineer",
    impactHighlight: "Near real-time",
    evidence: documented,
    arch: [
      { title: "Events", note: "partitioned stream", items: [{ logo: "api", label: "Event Hub" }] },
      { title: "Process", in: "micro-batches", note: "checkpointed", items: [{ logo: "databricks", label: "Spark" }] },
      { title: "Store", in: "validated", note: "replayable", items: [{ logo: "deltalake", label: "Delta" }] },
    ],
  },
  {
    id: "fabric-dataflow-incremental",
    domain: "de",
    short: "Fabric Incremental Loads",
    tagline: "Incremental Microsoft Fabric ingestion with Dataflow Gen2 and pipeline orchestration.",
    title: "Microsoft Fabric Dataflow Gen2 Incremental Loads",
    description:
      "A watermark-driven Fabric pattern that moves only changed data and keeps refreshes observable and repeatable.",
    fullDescription:
      "Implemented incremental ingestion in Microsoft Fabric using Dataflow Gen2 and pipelines. Watermarks constrain each run to new or changed records, while orchestration captures run status and supports safe retries.",
    tech: ["Microsoft Fabric", "Dataflow Gen2", "Pipelines", "Lakehouse"],
    technologies: ["Microsoft Fabric", "Dataflow Gen2", "Fabric Data Pipelines", "Lakehouse", "Power Query"],
    metrics: [
      { label: "Pattern", value: "Incremental", description: "changed rows only" },
      { label: "Tooling", value: "Fabric", description: "managed orchestration" },
    ],
    problem:
      "Full refreshes repeatedly scanned unchanged data, extended refresh windows, and made recovery more expensive.",
    solution:
      "Persisted watermarks and parameterized Dataflow Gen2 queries limit extraction to changed records, with pipelines coordinating order, retries, and run logging.",
    features: [
      "Watermark-based extraction",
      "Parameterized Dataflow Gen2 transformations",
      "Pipeline retries and run-state logging",
      "Lakehouse-ready incremental outputs",
    ],
    status: "Production",
    role: "Data Engineer",
    impactHighlight: "Incremental ETL",
    evidence: documented,
    arch: [
      { title: "Source", note: "watermarked", items: [{ logo: "mssql", label: "Source data" }] },
      { title: "Transform", in: "changes only", note: "Dataflow Gen2", items: [{ logo: "fabric", label: "Fabric" }] },
      { title: "Land", in: "orchestrated", note: "incremental", items: [{ logo: "deltalake", label: "Lakehouse" }] },
    ],
  },
  {
    id: "ml-ops-batch-realtime",
    domain: "ai",
    short: "Batch & Real-Time MLOps",
    tagline: "Two production serving paths with shared model lineage and monitoring.",
    title: "ML Operationalization - Batch & Real-Time",
    description:
      "Operationalized machine-learning models for scheduled batch scoring and low-latency online inference.",
    fullDescription:
      "Created repeatable deployment patterns for batch and real-time model inference, keeping model versions, feature contracts, predictions, and operational traces connected across both serving modes.",
    tech: ["MLOps", "Databricks", "MLflow", "Python"],
    technologies: ["Databricks", "MLflow", "Python", "Batch inference", "Real-time endpoints", "Model monitoring"],
    metrics: [
      { label: "Serving modes", value: "2", description: "batch and real-time" },
      { label: "Traceability", value: "Yes", description: "versioned model lineage" },
    ],
    problem:
      "Models that performed well in notebooks lacked a repeatable path into scheduled workflows and real-time applications.",
    solution:
      "A shared MLflow lifecycle registers approved models, packages inference consistently, and deploys them to batch jobs or online endpoints with monitoring around each path.",
    features: [
      "Versioned model registry and promotion",
      "Scheduled batch inference",
      "Low-latency real-time serving",
      "Prediction and model-version traceability",
    ],
    status: "Production",
    role: "Data Scientist / ML Engineer",
    impactHighlight: "ML in production",
    evidence: documented,
    arch: [
      { title: "Train", note: "tracked runs", items: [{ logo: "python", label: "Models" }] },
      { title: "Register", in: "approve", note: "versioned", items: [{ logo: "databricks", label: "MLflow" }] },
      { title: "Serve", in: "promote", note: "batch + online", items: [{ logo: "deploy", label: "Inference" }] },
    ],
  },
  {
    id: "c2s-agritech-warehouse",
    domain: "da",
    short: "Agritech Warehouse",
    tagline: "A Synapse star-schema warehouse and Power BI layer for agritech operations.",
    title: "Agritech Data Warehouse & Power BI",
    description:
      "Incremental Synapse data warehousing with conformed dimensions and a decision-ready Power BI model.",
    fullDescription:
      "Modeled agritech operational data into a star schema, built incremental warehouse loads, and exposed governed measures in Power BI so teams could analyze performance without querying source systems directly.",
    tech: ["Synapse", "Power BI", "Star Schema", "SQL"],
    technologies: ["Azure Synapse Analytics", "SQL", "Dimensional modeling", "Incremental ETL", "Power BI"],
    metrics: [
      { label: "Model", value: "STAR", description: "dimensional warehouse" },
      { label: "Load", value: "Incremental", description: "watermark driven" },
    ],
    problem:
      "Operational data was difficult to combine consistently for historical reporting and cross-functional analysis.",
    solution:
      "A Synapse warehouse organizes facts and conformed dimensions, while incremental loading and a shared Power BI model create a stable reporting foundation.",
    features: [
      "Fact and conformed-dimension modeling",
      "Incremental warehouse loading",
      "Reusable Power BI semantic measures",
      "Source-to-report validation",
    ],
    status: "Completed",
    role: "Data Engineer / BI Developer",
    impactHighlight: "STAR + Power BI",
    evidence: documented,
    arch: [
      { title: "Sources", note: "operational data", items: [{ logo: "api", label: "Agritech" }] },
      { title: "Model", in: "incremental", note: "star schema", items: [{ logo: "synapse", label: "Synapse" }] },
      { title: "Analyze", in: "semantic model", note: "decision-ready", items: [{ logo: "powerbi", label: "Power BI" }] },
    ],
  },
  {
    id: "truck-platooning-aero-thermal",
    domain: "ai",
    short: "Truck Platooning CFD",
    tagline: "CAD and CFD analysis of aerodynamic drag and underhood thermal behavior in truck platoons.",
    title: "Aerodynamic & Underhood Thermal Analysis - Truck Platooning",
    description:
      "A SolidWorks and Ansys study evaluating how platoon spacing changes drag and thermal performance.",
    fullDescription:
      "Built 3D vehicle geometry and simulation cases for heavy-duty truck platooning, comparing aerodynamic and underhood thermal behavior across recorded spacing scenarios.",
    tech: ["SolidWorks", "Ansys", "CFD", "Thermal Analysis"],
    technologies: ["SolidWorks", "Ansys Fluent", "Computational fluid dynamics", "Thermal analysis", "Simulation"],
    metrics: [
      { label: "Spacing", value: "30-60 ft", description: "evaluated platoon range" },
      { label: "Focus", value: "Drag + heat", description: "aero-thermal study" },
    ],
    problem:
      "Closer platooning can reduce drag but may also change cooling airflow and underhood temperature behavior.",
    solution:
      "Parameterized simulation cases compare flow, drag, pressure, and thermal behavior across truck spacing configurations.",
    features: ["3D CAD preparation", "CFD boundary-condition setup", "Spacing comparison", "Aero-thermal result analysis"],
    status: "Completed",
    role: "Graduate researcher",
    impactHighlight: "Spacing trade-off",
    evidence: academic,
    arch: [
      { title: "Geometry", note: "3D CAD", items: [{ text: "CAD", label: "SolidWorks" }] },
      { title: "Simulate", in: "mesh", note: "flow + heat", items: [{ text: "CFD", label: "Ansys" }] },
      { title: "Compare", in: "30-60 ft", note: "drag + thermal", items: [{ logo: "chart", label: "Results" }] },
    ],
  },
  {
    id: "stock-market-ml-prediction",
    domain: "ai",
    short: "Stock Market ML",
    tagline: "A comparative ML study of market-direction prediction across classical and sequence models.",
    title: "Stock Market Prediction with ML Algorithms",
    description:
      "Prepared market data and compared Random Forest, LSTM, and SVM classification performance.",
    fullDescription:
      "Engineered time-series features from historical market data and evaluated multiple algorithms using held-out observations to compare directional prediction performance.",
    tech: ["Python", "LSTM", "Random Forest", "SVM"],
    technologies: ["Python", "pandas", "scikit-learn", "TensorFlow", "LSTM", "Support Vector Machines"],
    metrics: [
      { label: "Random Forest", value: "78%", description: "recorded accuracy" },
      { label: "LSTM", value: "85%", description: "recorded accuracy" },
      { label: "SVM", value: "87%", description: "recorded accuracy" },
    ],
    problem:
      "Market time series are noisy, non-stationary, and susceptible to leakage when preprocessing and evaluation are not time-aware.",
    solution:
      "A time-ordered preprocessing and evaluation pipeline compares classical and sequence-model approaches on the same prediction target.",
    features: ["Time-series feature preparation", "Model comparison", "Held-out evaluation", "Metric-driven selection"],
    status: "Completed",
    role: "Data Scientist",
    impactHighlight: "SVM 87%",
    evidence: academic,
    arch: [
      { title: "Market", note: "historical data", items: [{ logo: "chart", label: "Prices" }] },
      { title: "Model", in: "features", note: "RF + LSTM + SVM", items: [{ logo: "python", label: "ML" }] },
      { title: "Evaluate", in: "holdout", note: "accuracy", items: [{ logo: "dashboard", label: "Scores" }] },
    ],
  },
  {
    id: "robot-nav-deep-rl",
    domain: "ai",
    short: "Robot Navigation DRL",
    tagline: "A TD3 reinforcement-learning agent for goal-directed navigation in ROS Gazebo.",
    title: "Robot Navigation with Deep Reinforcement Learning",
    description:
      "Trained and evaluated a PyTorch TD3 agent for simulated robot navigation and obstacle avoidance.",
    fullDescription:
      "Connected a ROS Gazebo environment to a Twin Delayed DDPG agent, shaped rewards around progress and collision avoidance, and evaluated navigation success across simulated scenarios.",
    tech: ["ROS", "Gazebo", "PyTorch", "TD3"],
    technologies: ["Robot Operating System", "Gazebo", "Python", "PyTorch", "Deep reinforcement learning", "TD3"],
    metrics: [
      { label: "Success", value: "95%", description: "recorded navigation rate" },
      { label: "Reward", value: "~230", description: "recorded evaluation reward" },
    ],
    problem:
      "A mobile robot must reach goals while handling continuous control and avoiding obstacles in an uncertain environment.",
    solution:
      "A TD3 agent learns continuous actions from simulated experience, using shaped rewards and replay to improve stable navigation behavior.",
    features: ["ROS/Gazebo simulation", "Continuous-control agent", "Reward shaping", "Scenario-based evaluation"],
    status: "Completed",
    role: "ML / Robotics researcher",
    impactHighlight: "95% success",
    evidence: academic,
    arch: [
      { title: "Simulate", note: "ROS Gazebo", items: [{ text: "ROS", label: "Robot" }] },
      { title: "Learn", in: "state + reward", note: "TD3", items: [{ logo: "pytorch", label: "Agent" }] },
      { title: "Navigate", in: "actions", note: "goal + avoidance", items: [{ logo: "chart", label: "Evaluation" }] },
    ],
  },
  {
    id: "autonomous-drone",
    domain: "ai",
    short: "Autonomous Tello Drone",
    tagline: "Python and OpenCV control for vision-guided DJI Tello flight.",
    title: "Autonomous DJI Tello Drone Control",
    description:
      "Implemented computer-vision tracking and gesture-driven control for a DJI Tello drone.",
    fullDescription:
      "Connected DJI Tello flight commands with an OpenCV perception loop to support target tracking, gesture interpretation, and autonomous control behaviors.",
    tech: ["Python", "OpenCV", "Computer Vision", "DJI Tello"],
    technologies: ["Python", "OpenCV", "DJI Tello SDK", "Object tracking", "Gesture recognition"],
    metrics: [
      { label: "Gestures", value: "90%", description: "recorded recognition rate" },
      { label: "Detection", value: "80%", description: "recorded detection rate" },
      { label: "Tracking", value: "95%", description: "recorded tracking rate" },
    ],
    problem:
      "Stable autonomous flight requires turning noisy visual detections into timely, bounded control commands.",
    solution:
      "A real-time OpenCV loop detects and tracks the target, converts image-space error into flight commands, and applies safety bounds before sending commands to the drone.",
    features: ["Real-time video processing", "Target tracking", "Gesture control", "Bounded flight commands"],
    status: "Completed",
    role: "Computer Vision / Robotics developer",
    impactHighlight: "95% tracking",
    evidence: academic,
    arch: [
      { title: "Observe", note: "camera stream", items: [{ text: "CAM", label: "Tello" }] },
      { title: "Perceive", in: "frames", note: "detect + track", items: [{ logo: "python", label: "OpenCV" }] },
      { title: "Control", in: "bounded commands", note: "autonomous", items: [{ text: "UAV", label: "Flight" }] },
    ],
  },
  {
    id: "heart-disease-ml",
    domain: "ai",
    short: "Heart Disease ML",
    tagline: "A classification study for heart-disease risk using interpretable clinical features.",
    title: "Heart Disease Predictor (Machine Learning)",
    description:
      "Compared scikit-learn classifiers for heart-disease prediction, with Random Forest producing the recorded best result.",
    fullDescription:
      "Prepared a clinical tabular dataset, evaluated classification models under a consistent split, and reviewed feature contribution and error trade-offs for the strongest model.",
    tech: ["Python", "scikit-learn", "Random Forest", "Classification"],
    technologies: ["Python", "pandas", "scikit-learn", "Random Forest", "Classification metrics"],
    metrics: [{ label: "Accuracy", value: "85%", description: "recorded Random Forest result" }],
    problem:
      "Clinical tabular data requires careful preprocessing and balanced evaluation because accuracy alone can hide important error types.",
    solution:
      "A reproducible classification pipeline preprocesses features, compares candidate models, and evaluates the selected estimator using multiple classification measures.",
    features: ["Tabular preprocessing", "Classifier comparison", "Feature analysis", "Error-metric review"],
    status: "Completed",
    role: "Data Scientist",
    impactHighlight: "Random Forest 85%",
    evidence: academic,
    arch: [
      { title: "Data", note: "clinical features", items: [{ logo: "data", label: "Dataset" }] },
      { title: "Model", in: "preprocess", note: "Random Forest", items: [{ logo: "sklearn", label: "Classifier" }] },
      { title: "Evaluate", in: "holdout", note: "risk metrics", items: [{ logo: "chart", label: "Results" }] },
    ],
  },
  {
    id: "ml-eda-timing-pba",
    domain: "ai",
    short: "Digital Timing ML",
    tagline: "Machine learning to estimate path-based timing from graph-based analysis signals.",
    title: "ML for High-Frequency Low-Power Digital Design Timing",
    description:
      "Used Random Forest and related models to study the relationship between GBA inputs and PBA timing outcomes.",
    fullDescription:
      "Engineered timing-path features from graph-based analysis results and trained regression models to approximate more detailed path-based analysis behavior.",
    tech: ["Python", "Random Forest", "EDA", "Regression"],
    technologies: ["Python", "pandas", "scikit-learn", "Random Forest", "Static timing analysis", "EDA"],
    metrics: [
      { label: "Input", value: "GBA", description: "graph-based timing" },
      { label: "Target", value: "PBA", description: "path-based timing" },
    ],
    problem:
      "Detailed path-based timing analysis can be more computationally expensive than graph-based analysis during design iteration.",
    solution:
      "A supervised model learns from path features and paired GBA/PBA results to estimate which paths merit deeper analysis.",
    features: ["Timing-path feature engineering", "Regression-model comparison", "GBA-to-PBA mapping", "Error analysis"],
    status: "Completed",
    role: "Data Scientist / EDA researcher",
    impactHighlight: "GBA to PBA ML",
    evidence: academic,
    arch: [
      { title: "Analyze", note: "GBA paths", items: [{ text: "EDA", label: "Timing" }] },
      { title: "Learn", in: "path features", note: "Random Forest", items: [{ logo: "sklearn", label: "Regression" }] },
      { title: "Estimate", in: "predict", note: "PBA target", items: [{ logo: "chart", label: "Timing" }] },
    ],
  },
  {
    id: "robotic-arm-kinematics",
    domain: "ai",
    short: "5-DOF Arm Kinematics",
    tagline: "Forward and inverse kinematics for a five-degree-of-freedom robotic arm.",
    title: "Forward & Inverse Kinematics - 5 DOF Robotic Arm",
    description:
      "MATLAB implementations of forward and inverse kinematics for a five-axis robotic arm.",
    fullDescription:
      "Modeled a five-degree-of-freedom arm, implemented forward kinematics from joint states to end-effector pose, and solved inverse-kinematics cases for requested positions.",
    tech: ["MATLAB", "Robotics", "Kinematics", "5-DOF"],
    technologies: ["MATLAB", "Robotics", "Forward kinematics", "Inverse kinematics", "Transformation matrices"],
    metrics: [
      { label: "Degrees of freedom", value: "5", description: "modeled arm joints" },
      { label: "Forward kinematics", value: "Yes", description: "implemented and evaluated" },
    ],
    problem:
      "Mapping between joint angles and end-effector position becomes nonlinear and may admit multiple inverse solutions.",
    solution:
      "Transformation matrices model the forward chain, while inverse calculations solve feasible joint configurations under the arm's geometric constraints.",
    features: ["Link transformation model", "Forward pose calculation", "Inverse solution calculation", "Workspace evaluation"],
    status: "Completed",
    role: "Robotics developer",
    impactHighlight: "5-DOF FK/IK",
    evidence: academic,
    arch: [
      { title: "Inputs", note: "joint states", items: [{ text: "5D", label: "Arm" }] },
      { title: "Solve", in: "matrices", note: "FK + IK", items: [{ text: "MAT", label: "MATLAB" }] },
      { title: "Pose", in: "transform", note: "position + angle", items: [{ logo: "chart", label: "Output" }] },
    ],
  },
];
