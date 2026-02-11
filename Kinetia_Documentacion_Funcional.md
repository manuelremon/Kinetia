# Documentación Funcional y Técnica: Proyecto Kinetia

**Fecha de Última Actualización:** 05 de Febrero de 2026
**Versión:** 2.2.0 (Engineering Boutique Pivot)
**Repositorio:** https://github.com/manuelremon/Kinetia

---

## 1. Visión General y Contexto del Negocio

**Kinetia** es una Boutique de Ingeniería de Software especializada en resolver problemas operativos complejos. Nos alejamos de la consultoría genérica para enfocarnos en soluciones técnicas de alta precisión.

### Propuesta de Valor
*   **Ingeniería de Software para Operaciones:** Desarrollo de sistemas robustos para logística, retail y finanzas.
*   **Neural Inventory Engine:** Algoritmos de predicción de demanda con Python y Pandas para optimizar stock.
*   **Agentic ERP Integration:** Agentes de IA que no solo responden, sino que ejecutan acciones en sistemas empresariales (RAG + Function Calling).
*   **Liquid Engineering Teams:** Células ágiles de desarrollo con liderazgo técnico centralizado y expertos on-demand.

### Asistente Virtual (KINA)
La plataforma integra un agente de IA llamado **KINA**, impulsado por Google Gemini (modelo `gemini-2.0-flash`). KINA actúa como el primer nivel de soporte técnico y comercial.

---

## 2. Stack Tecnológico

La arquitectura prioriza la solidez técnica y el rendimiento, combinando el ecosistema Next.js con herramientas de Data Science.

### Frontend (Cliente)
*   **Framework:** Next.js 15 (App Router) con React 19 RC.
*   **Lenguaje:** TypeScript (Tipado estático estricto).
*   **Estilizado:** SCSS Modules con enfoque en diseño corporativo y técnico.
*   **Animaciones:** Framer Motion para visualizaciones de datos y transiciones de interfaz.

### Backend & Data
*   **Server Actions:** Lógica de negocio en servidor con Next.js.
*   **Python Integration:** Uso de Python (Pandas, Prophet, XGBoost) para modelos de predicción (en servicios satélite).
*   **AI & LLMs:**
    *   **LangChain:** Orquestación de agentes.
    *   **RAG:** Retrieval-Augmented Generation para procesamiento de documentos.
    *   **Google Gemini API:** Modelo base para KINA.

### Infraestructura
*   **Cloud:** AWS (arquitectura serverless y contenedores).
*   **Database:** PostgreSQL (datos estructurados).

---

## 3. Estructura del Proyecto

```
kinetia/
├── app/                          # Next.js App Router
├── src/
│   ├── components/
│   │   ├── common/              # Componentes UI (PrecisionButton, etc.)
│   │   ├── sections/            # Secciones (Hero, Services, Labs)
│   ├── hooks/                   # Custom Hooks
│   ├── styles/                  # SCSS globales
│   └── types/                   # TypeScript types
```

---

## 4. Componentes del Sistema

### Layout Components
| Componente | Descripción |
|------------|-------------|
| `Header` | Navegación corporativa con dropdowns (Soluciones, Industrias) |
| `Footer` | Pie de página técnico |

### Section Components
| Componente | Descripción |
|------------|-------------|
| `Hero` | "Engineering Background" con grid técnico y `PrecisionButton` |
| `ServicesBento` | Grid de servicios con visualizaciones técnicas animadas |
| `EngineeringLabs` | Showcase de prototipos funcionales (StockFlow AI, ProcureBot) |
| `ProblemSolution` | Presentación problema-solución |
| `TrustBadges` | Badges de tecnologías y partners |
| `Contact` | Formulario de contacto directo |

### Visualizaciones en ServicesBento
| Visualización | Servicio | Descripción |
|---------------|----------|-------------|
| `ForecastChart` | Neural Inventory | Gráfico SVG animado de predicción de series temporales |
| `ChipLoader` | Agentic ERP | Chip visualizando flujo de datos RAG y procesamiento |
| `TeamVisualization` | Liquid Teams | Grafo de nodos conectando Lead con expertos |
| `TechStackLogos` | Tech Stack | Logos de tecnologías core (Python, Next.js, AWS) |

### Common Components
| Componente | Descripción |
|------------|-------------|
| `PrecisionButton` | Botón estilo ingeniería, sólido y reactivo |
| `TechBadge` | Badge para mostrar tecnologías utilizadas |
| `ChatWidget` | Widget de chat flotante (KINA) |

---

## 5. Lógica de Negocio y Flujos

### Flujo de Labs (Prototipos)
La sección `EngineeringLabs` demuestra capacidades técnicas reales:
1.  **StockFlow AI:** Dashboard de predicción de inventario.
2.  **ProcureBot:** Agente autónomo de compras y negociación.

Cada tarjeta de proyecto incluye:
*   Visualización de código (snippet de Python).
*   Métricas de impacto (ej: "Precisión Forecast 94%").
*   Stack tecnológico específico.

---

## 6. Sistema de Diseño (UI/UX)

La identidad visual ha evolucionado hacia "Engineering Boutique": sobriedad, precisión y confianza técnica.

### Tipografía
*   **Inter:** Fuente principal para interfaz limpia y legible.
*   **JetBrains Mono:** Fuente para código y datos técnicos.

### Paleta de Colores
*   **Navy Base:** Fondo oscuro profundo para contraste técnico.
*   **Blue Accent:** Azul corporativo para acciones y realces.
*   **Tech Grid:** Patrones de grilla sutiles en fondos.

---

## 7. Changelog

### v2.2.0 (05 Febrero 2026) - Engineering Boutique Pivot

#### Rebranding Estratégico
Transformación de la identidad visual y de contenido para posicionar a Kinetia como una "Boutique de Ingeniería" en lugar de una agencia generalista.

#### Cambios Principales
*   **Hero Redesign:** Nuevo fondo "Engineering Background" con líneas de flujo de datos y botones "PrecisionButton".
*   **ServicesBento:** Reemplazo de iconos genéricos por visualizaciones técnicas animadas (`ForecastChart`, `TeamVisualization`).
*   **Nuevo Header:** Navegación corporativa con menús desplegables para Soluciones e Industrias.
*   **Sección Labs:** Nueva sección `EngineeringLabs` para mostrar prototipos funcionales y código.
*   **Tech Stack:** Inclusión explícita de Python, Pandas y AWS en la propuesta de valor.

### v2.1.0 (Legacy)
*   Optimización UI/UX anterior con loaders animados (NewtonsCradle, etc.) - *Reemplazados en v2.2.0*.

### v2.0.0 (Migración Next.js 15)
*   Migración completa a App Router y Server Actions.
