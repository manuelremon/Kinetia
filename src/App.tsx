import {
  PageLoader,
  CustomCursor,
  BackgroundLayers,
  ExplosionCanvas,
  Header,
  Footer,
  Hero,
  LogosCarousel,
  Stats,
  Features,
  HowItWorks,
  CTA
} from '@/components';

import '@/styles/main.scss';

function App() {
  return (
    <>
      {/* Global Effects */}
      <PageLoader />
      <ExplosionCanvas />
      <CustomCursor />
      <BackgroundLayers />

      {/* Layout */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <LogosCarousel />
        <Stats />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      <Footer />

      {/* Click instruction tooltip */}
      <div className="click-instruction">
        <div className="click-instruction-icon">✨</div>
        <span>¡Haz clic en cualquier lugar para explosión de partículas!</span>
      </div>
    </>
  );
}

export default App;
