import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <>
      <header className="app-header">
        <Link to="/" className="brand-container" aria-label="Ir al inicio">
          <span className="brand-logo" aria-hidden="true">₿</span>
          <span className="brand-title">Pulso Abierto</span>
        </Link>
        <span className="header-link">Cotizaciones del mercado cripto</span>
      </header>

      <Outlet />

      <footer className="app-footer">
        <span>© 2026 Pulso Abierto</span>
        <span>
          Fuente de datos: <a href="https://www.coingecko.com" target="_blank" rel="noreferrer">CoinGecko</a>
        </span>
        <span>Proyecto académico desarrollado con React, Vite y TypeScript</span>
      </footer>
    </>
  );
}
