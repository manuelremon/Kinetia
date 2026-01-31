const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">¿Listo para optimizar tu operación?</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Hablemos sobre cómo podemos transformar tus procesos con tecnología a medida.
          Con base en <span className="text-blue-400 font-semibold">Neuquén</span>, trabajo cerca de las empresas del sector energético e industrial de la región.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="mailto:contacto@kinetia.com"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Enviar Email
          </a>
          <a
            href="#"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Agendar Consulta
          </a>
        </div>

        <div className="mt-16 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Kinetia. Todos los derechos reservados.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
