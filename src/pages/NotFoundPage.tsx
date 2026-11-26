import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <main style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>404 - Página no encontrada</h1>
      <p>La dirección ingresada no existe.</p>
      <Link to="/">Ir a la página principal</Link>
    </main>
  );
};