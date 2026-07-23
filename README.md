# FoodLink Frontend 🍲

Frontend de la plataforma FoodLink, una aplicación diseñada para la gestión y redistribución de excedentes alimentarios. Esta interfaz conecta de manera intuitiva a comercios, compradores y beneficiarios, permitiendo la venta, donación o retiro de alimentos para evitar el desperdicio.

## 🚀 Tecnologías y Stack

El proyecto está construido con un enfoque en rendimiento, tipado estricto y un diseño de interfaz ágil:

*   **Librería Principal:** React 19
*   **Lenguaje:** TypeScript
*   **Bundler:** Vite (con HMR y optimización de build)
*   **Enrutamiento:** React Router DOM
*   **Estilos:** Tailwind CSS
*   **Validación de Esquemas:** Zod

---

## 🏗️ Arquitectura del Proyecto

El código está estructurado siguiendo una **Arquitectura Orientada a Features / Funcionalidades**. Este diseño modular facilita la escalabilidad, el mantenimiento y la separación de responsabilidades, agrupando el código por contexto de negocio en lugar de por tipo de archivo.

### Estructura de Directorios

```text
src/
├── app/                  # Configuración global de la aplicación
│   ├── router/           # Definición de rutas principales (React Router)
│   └── provider/         # Contextos y proveedores globales
├── features/             # Módulos organizados por funcionalidad del negocio
│   ├── comercios/
│   ├── beneficiarios/
│   └── lotes/
├── components/           # Componentes compartidos y de presentación
│   ├── layouts/          # Estructuras de página (Navbars, Footers, Sidebars)
│   └── ui/               # Componentes base reutilizables (Botones, Inputs, Modales)
├── services/             # Integración con la API y lógica de peticiones externas
├── types/                # Definiciones de interfaces y tipos globales de TypeScript
├── utils/                # Funciones auxiliares y helpers
└── App.tsx               # Punto de entrada de la UI
