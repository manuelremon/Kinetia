const Portfolio = () => {
  const projects = [
    {
      title: "SPM System 2.0 / Forecast MR",
      description: "Solución integral para la gestión inteligente de inventarios, diseñada para optimizar el control de stock y mejorar la previsión de demanda en entornos industriales.",
      tags: ["Supply Chain", "Automation", "Stock Control"],
      link: "#" // Placeholder
    },
    {
      title: "Comparador de Precios",
      description: "Sistema de extracción y análisis de datos (Web Scraping) para monitorear y comparar precios del mercado local en tiempo real.",
      tags: ["Web Scraping", "Data Analysis", "Python"],
      link: "#" // Placeholder
    },
    {
      title: "Otros Proyectos",
      description: "Explora más de mi código y soluciones en mis repositorios públicos. Ejemplos de código limpio y buenas prácticas.",
      tags: ["Open Source", "Clean Code", "GitHub"],
      link: "#" // Placeholder
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Portafolio Destacado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Ver Proyecto &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
