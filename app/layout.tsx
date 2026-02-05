import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { IBM_Plex_Sans } from 'next/font/google';
import '@/styles/main.scss'; // Tus estilos globales
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'; // Wrapper cliente
import { WebVitalsProvider } from '@/components/providers/WebVitalsProvider'; // Web Vitals monitoring

// Optimización de Fuentes (Zero Layout Shift) - Solo 3 pesos esenciales
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

// Viewport Configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// SEO & Metadata API
export const metadata: Metadata = {
  title: {
    template: '%s | Kinetia - Transformación Digital',
    default: 'Kinetia | Consultora de Tecnología y Automatización',
  },
  description: 'Especialistas en Automatización de Procesos, IA Agentic y Desarrollo de Software a medida. Optimiza tu operación con tecnología de vanguardia.',
  keywords: ['Automatización', 'IA', 'Software', 'Kinetia', 'ERP', 'Consultoría'],
  authors: [{ name: 'Kinetia Team' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://kinetia.tech',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://kinetia.tech',
    siteName: 'Kinetia',
    title: 'Kinetia | Transformación Digital y Automatización',
    description: 'Especialistas en Automatización de Procesos, IA Agentic y Desarrollo de Software',
    images: [
      {
        url: 'https://kinetia.tech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kinetia - Transformación Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetia | Transformación Digital y Automatización',
    description: 'Especialistas en Automatización de Procesos, IA Agentic y Desarrollo de Software',
    images: ['https://kinetia.tech/og-image.jpg'],
  },
};

// JSON-LD Schemas - Organization + ProfessionalService (Web 2026 Standard)

// Organization Schema (para Knowledge Graph en Google)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kinetia',
  alternateName: 'Kinetia Tech',
  description: 'Consultora de automatización inteligente, IA agentic y desarrollo full-stack',
  url: 'https://kinetia.tech',
  logo: 'https://kinetia.tech/logo.png',
  foundingDate: '2023',
  areaServed: [
    {
      '@type': 'Country',
      name: 'Argentina'
    },
    {
      '@type': 'Country',
      name: 'Latinoamérica'
    }
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: 'info@kinetia.tech',
    telephone: '+54-9-299-XXX-XXXX',
    availableLanguage: ['es', 'en']
  },
  sameAs: [
    'https://www.linkedin.com/company/kinetia',
    'https://twitter.com/kinetia_tech',
    'https://www.instagram.com/kinetia_tech',
    'https://github.com/kinetia-tech'
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
    addressRegion: 'Neuquén',
    addressLocality: 'Neuquén',
    streetAddress: 'Neuquén, Argentina'
  }
};

// ProfessionalService Schema con Offers detallados
const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kinetia',
  url: 'https://kinetia.tech',
  description: 'Consultoría en automatización de procesos, optimización de inventarios con ML, sistemas personalizados y agentes IA',
  image: 'https://kinetia.tech/og-image.jpg',
  priceRange: '$$$',

  // Servicios ofrecidos como Service items
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Kinetia',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Automatización de Procesos',
        description: 'Transformación de flujos manuales en sistemas autónomos con RPA/BPA',
        price: 'Consultar',
        priceCurrency: 'ARS',
        url: 'https://kinetia.tech/#servicios'
      },
      {
        '@type': 'Offer',
        name: 'Optimización de Inventarios',
        description: 'Predicción de demanda con ML y reducción de costos de almacenamiento',
        price: 'Consultar',
        priceCurrency: 'ARS',
        url: 'https://kinetia.tech/#servicios'
      },
      {
        '@type': 'Offer',
        name: 'Sistemas Personalizados',
        description: 'Desarrollo full-stack de ERPs, CRMs y plataformas empresariales',
        price: 'Consultar',
        priceCurrency: 'ARS',
        url: 'https://kinetia.tech/#servicios'
      },
      {
        '@type': 'Offer',
        name: 'Agentic AI',
        description: 'Agentes autónomos y automatización inteligente con LLMs',
        price: 'Consultar',
        priceCurrency: 'ARS',
        url: 'https://kinetia.tech/#servicios'
      }
    ]
  },

  // Contacto y localización
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'info@kinetia.tech',
    telephone: '+54-9-299-XXX-XXXX',
    areaServed: 'AR,MX,CO,CL,PE,BR'
  },

  // Ubicación
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
    addressLocality: 'Neuquén',
    addressRegion: 'Neuquén'
  }
};

// FAQ Schema for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué ofrece Kinetia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kinetia ofrece automatización de procesos, optimización de inventarios, sistemas personalizados y entrenamiento de agentes IA.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona la automatización de procesos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Transformamos tareas manuales en flujos de trabajo inteligentes que reducen tiempos, errores y costos operativos.'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={ibmPlexSans.variable}>
      <head>
        {/* JSON-LD Schemas for SEO & Rich Snippets (Web 2026) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="professional-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <WebVitalsProvider />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
