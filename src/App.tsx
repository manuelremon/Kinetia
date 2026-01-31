import {
  Header,
  Footer,
  Hero,
  Services,
  Portfolio,
  Contact
} from '@/components';

// import '@/styles/main.scss'; // Removed SCSS to rely on Tailwind

function App() {
  return (
    <>
      <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
        {/* Layout */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          <Hero />
          <Services />
          <Portfolio />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
