export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background gradient or overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90 z-0"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Soluciones de Software que <br />
          <span className="text-blue-500">Optimizan tu Operación</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Desarrollador Full Stack especializado en la automatización de procesos y optimización de cadenas de suministro (Supply Chain).
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#portfolio"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
          >
            Agendar consulta
          </a>
        </div>
      </div>
    </section>
  );
}
