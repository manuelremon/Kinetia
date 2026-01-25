import {
  PageLoader,
  Header,
  Footer,
  Hero,
  ChooseRoute,
  LogoCarousel,
  ProblemSolution,
  TrustBadges,
  Services,
  Testimonials,
  CaseStudies,
  Stats,
  Features,
  HowItWorks,
  About,
  FAQ,
  FinalCTA,
  Contact,
  ChatWidget,
  ScrollToTop,
  ScrollProgress
} from '@/components';
import { useSmoothScroll } from '@/hooks';

import '@/styles/main.scss';

function App() {
  useSmoothScroll();

  return (
    <>
      {/* Global Effects */}
      <PageLoader />
      <ScrollProgress />

      {/* Layout */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <ChooseRoute />
        <ProblemSolution />
        <Services />
        <Testimonials />
        <CaseStudies />
        <Stats />
        <TrustBadges />
        <LogoCarousel />
        <Features />
        <HowItWorks />
        <About />
        <FAQ />
        <FinalCTA />
        <Contact />
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
