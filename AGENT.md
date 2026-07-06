# AGENT.md

## Qué es este proyecto
- Portafolio de una sola página en React 18 + TypeScript montado con Vite; contenido en español presentando a Joaquín Cordisco (Automatización IT / DevOps / Soporte de aplicaciones).
- Estructura principal: `index.html` → `src/main.tsx` (monta React y estilos) → `src/App.tsx`, que coloca el fondo, el header y las secciones (`Hero`, `About`, `Projects`, `CaseStudies`, `Skills`, `Testimonials`, `Blog`, `Contact`) seguido de `Footer`.
- Animaciones con `motion/react` (Framer Motion), iconos con `lucide-react`, gradientes y estilo oscuro usando utilidades de Tailwind.

## Cómo ejecutar
- `npm i` y luego `npm run dev` para desarrollo (Vite abre en el puerto 3000 según `vite.config.ts`).
- `npm run build` genera la salida en `build/`.

## Componentes y datos clave (todos en `src/components` a menos que se indique)
- `Header.tsx`: barra fija que cambia de fondo al hacer scroll (`isScrolled`), navegación por anclas (#home, #about, #projects, #skills, #blog, #contact) y menú móvil colapsable. Branding: “Joaquín Cordisco”.
- `GridBackground.tsx`: fondo fijo con cuadrícula y orbes difuminados; permanece detrás del contenido.
- `Hero.tsx`: presenta a Joaquín Cordisco (Automatización IT / DevOps), CTA "Ver mis proyectos" y "Hablemos", enlaces sociales reales (GitHub: `cordiscxx`, LinkedIn: `/in/joaquin-cordisco`, mail: `joaquincordisco@gmail.com`).
- `About.tsx`: narrativa basada en el CV (Atos/Stellantis; Janus Automation/Tenaris); highlights de automatización, DevOps, soporte, observabilidad; métricas 7+ años y 30+ usuarios capacitados.
- `Projects.tsx`: tarjetas de `projects[]` conformadas al CV (URL Shortener IaC, ChatBot con IA y observabilidad, Automatización batch SAP). Usa `ImageWithFallback` para mostrar un SVG inline si falla la carga.
- `CaseStudies.tsx`: `caseStudies[]` alineados a trabajos reales (Stellantis con Dollar Universe; Tenaris con QA/capacitaciones). Usa íconos `TrendingUp`, `Users`, `Clock`.
- `Skills.tsx`: categorías actualizadas (DevOps & Cloud; Automatización & Scripting; Monitoreo & Observabilidad; Sistemas & Datos) con chips animados.
- `Testimonials.tsx`: `testimonials[]` mencionan a Joaquín.
- `Blog.tsx`: artículos mock en `articles[]` (título, extracto, fecha, tiempo de lectura, categoría, imagen, gradiente) con CTA "Ver todos los artículos".
- `Contact.tsx`: formulario controlado con `useState`; `handleSubmit` solo hace `console.log` (sin backend/email real). Incluye bloques de contacto reales (correo, ubicación Buenos Aires remota/híbrida, teléfono +54 336 4626831), links sociales reales (GitHub/LinkedIn), y CTA para pedir el CV por email (enlaza a mailto).
- `Footer.tsx`: CTA final, créditos y botón para volver al tope (`scrollTo` suave) más línea de gradiente inferior; firma “Joaquín Cordisco”.
- `components/figma/ImageWithFallback.tsx`: wrapper de imagen con manejo de error (muestra SVG base64 y conserva la URL original en `data-original-url`).
- `components/ui/*`: set de componentes/shadcn basados en Radix (accordion, dialog, select, etc.) disponibles pero no usados en la página actual.

## Estilos
- Tailwind 4 integrado y utilidades generadas en `src/index.css` (incluye reset y tokens). Fuentes Cabinet Grotesk y Satoshi desde Fontshare.
- Variables y tipografía adicionales en `src/styles/globals.css` (paleta #0a0a0f de fondo, acento #00ff94, scroll suave y scrollbar personalizado). `body` usa Satoshi por defecto.
- Diseño oscurecido con gradientes verde/azul/morado y bordes translúcidos; muchas superficies usan `bg-zinc-*` con transparencia y blur.

## Dependencias principales
- Runtime: `react`, `react-dom`, `motion` (Framer Motion), `lucide-react`, Tailwind utilities. Datos de demostración con imágenes Unsplash.
- UI helper: Radix + shadcn components en `src/components/ui` y `class-variance-authority`/`tailwind-merge` para variantes (aunque hoy no se importan en `App`).
- Tooling: Vite + plugin `@vitejs/plugin-react-swc`; aliases en `vite.config.ts` fijan versiones para evitar duplicados (ej. `@radix-ui/react-*`, `lucide-react@0.487.0`).

