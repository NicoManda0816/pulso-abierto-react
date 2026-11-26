import React from 'react';

interface StatusHandlerProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry: () => void;
}

export const StatusHandler: React.FC<StatusHandlerProps> = ({
  loading,
  error,
  isEmpty,
  onRetry,
}) => {
  if (loading) {
    return <p aria-live="polite">Cargando información de criptomonedas...</p>;
  }

  if (error) {
    return (
      <div role="alert">
        <p>Hubo un error al obtener los datos: {error}</p>
        <button onClick={onRetry}>Volver a intentar</button>
      </div>
    );
  }

  if (isEmpty) {
    return <p>No se encontraron resultados para la consulta realizada.</p>;
  }

  return null;
};