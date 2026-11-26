# Informe de revisión

## Problemas corregidos

- Se agregó la dependencia faltante `zustand` y se actualizó el lockfile.
- Se eliminó la declaración duplicada del tipo `Crypto`.
- Se corrigió la incompatibilidad de `isFavorite` con el modelo de datos.
- Se reemplazó la versión estática de `App` por el flujo real con rutas y API.
- Se conectaron las páginas de inicio, detalle y 404 mediante React Router.
- Se implementó persistencia de favoritos con Zustand.
- Se mejoró la búsqueda para admitir nombre, símbolo y campo vacío.
- Se añadió consulta en vivo en la página de detalle.
- Se completaron los estilos faltantes y el diseño adaptable.
- Se corrigieron textos, accesibilidad, estados de carga, error y reintento.

## Verificaciones realizadas

- `npm run lint`: aprobado sin advertencias.
- `npm run build`: aprobado.
- API de CoinGecko: respuesta correcta con tres cotizaciones.
- Validación de búsqueda: aprobada.
- Búsqueda por símbolo: aprobada.
- Navegación a detalle: aprobada.
- Persistencia de favoritos tras recargar: aprobada.
