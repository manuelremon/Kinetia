import {
  PageLoader,
  BackgroundLayers,
  ExplosionCanvas,
  Header,
  Footer,
  Hero,
  StatsTools,
  Services,
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
      <BackgroundLayers />

      {/* Layout */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <StatsTools />
        <Services />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
