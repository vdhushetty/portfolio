// src/About.jsx
export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto p-0 m-0 pb-20 text-black">
      <h2 className="text-5xl font-bold m-0 p-0 mb-8 text-center">About Me</h2>
      <div className="h-1 w-20 bg-blue-600 mx-auto mb-12 rounded-full"></div>
      <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-center">
        With 5+ years of experience developing scalable big data solutions and ETL processes on cloud platforms such as Azure, AWS, GCP, and Snowflake, I specialize in Apache Spark for high-volume data transformation and analytics workflows. I am skilled in building interactive dashboards in Power BI using DAX and Power Query, and have a strong foundation in machine learning and AI, including Transformer architectures and frameworks like TensorFlow, PyTorch, and Hugging Face for NLP and deep learning applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="glossy-button p-8 rounded-2xl text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">5+</div>
          <div className="text-gray-700 font-semibold">Years Experience</div>
        </div>
        <div className="glossy-button p-8 rounded-2xl text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">10+</div>
          <div className="text-gray-700 font-semibold">Projects Completed</div>
        </div>
        <div className="glossy-button p-8 rounded-2xl text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">3</div>
          <div className="text-gray-700 font-semibold">Cloud Certifications</div>
        </div>
      </div>
    </section>
  );
}
