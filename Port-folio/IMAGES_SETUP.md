# How to Add the Databricks Disaster Recovery Diagram Images

## Instructions:

1. **Save the PNG images** you provided to the public folder with these names:
   - `/Public-folio/public/Images/databricks-step1.png` - Step 1: Data Replication
   - `/Port-folio/public/Images/databricks-step2.png` - Step 2: Failover Activation
   - `/Port-folio/public/Images/databricks-step3.png` - Step 3: Primary Recovery
   - `/Port-folio/public/Images/databricks-step4.png` - Step 4: Normal Operations

2. **Image Requirements:**
   - Format: PNG
   - Recommended size: 1200x800px or larger
   - The images will be displayed at full width in the project detail page

3. **The images are referenced in:**
   - `src/pages/projectsData.js` - In the `steps` array, each step has an `image` property
   - `src/pages/ProjectDetail.jsx` - Renders the image at the bottom of each step

## Folder Structure:
```
Port-folio/
├── public/
│   └── Images/
│       ├── databricks-step1.png
│       ├── databricks-step2.png
│       ├── databricks-step3.png
│       └── databricks-step4.png
```

The images will automatically display after each step's key points section!
