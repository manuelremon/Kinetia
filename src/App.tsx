import {
  PageLoader,
  BackgroundLayers,
  ExplosionCanvas,
  Header,
  Footer,
  Hero,
  StatsTools,
  Services,
  Stats,
  Features,
  HowItWorks,
  CTA,
  About,
  TerminalSection,
  ChatWidget,
  ScrollToTop
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
        <Services />
        <StatsTools />
        <Stats />
        <Features />
        <HowItWorks />
        <CTA />
        <About />
        <TerminalSection />
      </main>

      <Footer />

      {/* Chat Widget */}
      <ChatWidget />

      {/* Scroll to Top */}
      <ScrollToTop />
    </>
  );
}

export default App;
