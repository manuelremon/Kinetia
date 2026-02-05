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
  CaseStudies,
  Stats,
  Features,
  HowItWorks,
  About,
  ScrollToTop,
  ScrollProgress,
  FAQ,
  FinalCTA,
  Contact,
  ChatWidget,
} from '@/components';

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden">
       {/* Global Effects */}
      <PageLoader />
      <ScrollProgress />
      
      <Header />
      
      {/* Main Content */}
      <Hero />
      <ChooseRoute />
      <ProblemSolution />
      <Services />
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
      
      <Footer />
      
      {/* Componente Cliente Flotante */}
      <ChatWidget />
       {/* Scroll to Top */}
      <ScrollToTop />
    </main>
  );
}
