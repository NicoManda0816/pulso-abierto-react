import React, { useState } from 'react';
import { z } from 'zod';

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, { message: 'El término de búsqueda debe tener al menos 2 caracteres.' }),
  currency: z.string().min(1, { message: 'Selecciona una moneda válida.' }),
});

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [text, setText] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = searchSchema.safeParse({ query: text, currency });

    if (!result.success) {
      setErrorMsg(result.error.issues[0].message);
      return;
    }

    setErrorMsg(null);
    onSearch(text);
  };

  return (
    <div className="card-box">
      <h3>Seleccioná una criptomoneda</h3>
      <p>Los valores se obtienen directamente de CoinGecko</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="search-input">Buscar por nombre o símbolo</label>
            <input
              id="search-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ej: bitcoin, ethereum, solana..."
            />
          </div>

          <div className="input-group" style={{ maxWidth: '150px' }}>
            <label htmlFor="currency-select">Moneda</label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="ars">ARS</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Consultar Precio
          </button>
        </div>

        {errorMsg && (
          <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.75rem', fontWeight: 600 }} role="alert">
            ⚠️ {errorMsg}
          </p>
        )}
      </form>
    </div>
  );
};
