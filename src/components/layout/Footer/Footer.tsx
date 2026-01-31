export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold text-white tracking-wider">
              KINETIA
            </a>
            <p className="mt-2 text-sm max-w-sm">
              Soluciones de software y automatización para la industria moderna.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kinetia. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             {/* Placeholder links */}
          </div>
        </div>
      </div>
    </footer>
  );
}
