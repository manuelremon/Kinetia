import {
  PageLoader,
  Header,
  Footer,
  Hero,
  ChooseRoute,
  ProblemSolution,
  TrustBadges,
  ServicesBento,
  HorizontalGallery,
  EngineeringLabs,
  Features,
  HowItWorks,
  About,
  ScrollToTop,
  ScrollProgress,
  FAQ,
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
      <ServicesBento />
      <EngineeringLabs />
      <HorizontalGallery />
      <TrustBadges />
      <Features />
      <HowItWorks />
      <About />
      <FAQ />
      <Contact />

      <Footer />

      {/* Componente Cliente Flotante */}
      <ChatWidget />
       {/* Scroll to Top */}
      <ScrollToTop />
    </main>
  );
}
