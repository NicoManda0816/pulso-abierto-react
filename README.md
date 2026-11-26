# Pulso Abierto

Aplicación web académica desarrollada con React, TypeScript y Vite para consultar las cotizaciones actuales de Bitcoin, Ethereum y Solana mediante la API pública de CoinGecko.

## Funcionalidades

- Consulta de precios en USD, EUR y ARS.
- Búsqueda por nombre o símbolo con validación mediante Zod.
- Estados de carga, error, ausencia de datos y reintento.
- Favoritos persistentes con Zustand y `localStorage`.
- Navegación entre el listado, el detalle y la página 404 con React Router.
- Diseño adaptable para escritorio y dispositivos móviles.

## Tecnologías principales

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Zod
- Vitest y Testing Library
- CoinGecko API

## Requisitos

- Node.js 24.15 o posterior de la rama 24, recomendado para ejecutar la aplicación y las pruebas.
- Conexión a Internet para consultar CoinGecko.

## Instalación

```bash
npm ci
```

## Comandos disponibles

```bash
npm run dev
npm run test
npm run lint
npm run build
npm run preview
```

- `npm run dev`: inicia la aplicación en modo desarrollo.
- `npm run test`: ejecuta las pruebas automatizadas una vez.
- `npm run lint`: analiza el código con Oxlint.
- `npm run build`: valida TypeScript y genera la versión productiva en `dist`.
- `npm run preview`: sirve localmente el contenido generado en `dist`.

## Variables de entorno

El proyecto no necesita variables de entorno propias. La aplicación consulta directamente el endpoint público de CoinGecko.

## Aplicación publicada

[Abrir Pulso Abierto en Vercel](https://pulso-abierto-react-phi.vercel.app/)

Vercel despliega desde la rama `main` con el preset de Vite. El comando de
compilación es `npm run build` y la carpeta de salida es `dist`. La configuración
en `vercel.json` permite abrir o recargar directamente las rutas de detalle.

## Mejora de mantenibilidad

Se identificó que el formateo monetario estaba duplicado en la tarjeta del listado y en la página de detalle. Se creó la función reutilizable `formatCurrency` en `src/utils/formatCurrency.ts` y ambos componentes pasaron a utilizarla, sin cambiar el formato visible.

Para comprobar que no se produjeron regresiones se ejecutaron las pruebas automatizadas, el lint, el build productivo y el preview. También se verificaron manualmente la consulta de precios, la navegación al detalle, la persistencia de favoritos, la validación del formulario y el diseño responsivo.

## Verificación final

- Pruebas ejecutadas: 4 pruebas aprobadas en 2 archivos.
- Lint ejecutado correctamente.
- Build generado correctamente.
- Preview comprobado en escritorio y a 390 px de ancho.
- Despliegue en Vercel realizado desde GitHub. En producción se verificaron la
  consulta a CoinGecko, la navegación, la recarga directa del detalle, los
  favoritos persistentes, el formulario y el diseño adaptable a 390 px.
- Fecha de verificación: 26 de noviembre de 2026.
