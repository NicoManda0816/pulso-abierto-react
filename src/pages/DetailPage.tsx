import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCryptoById } from '../services/cryptoService'
import { useFavoritesStore } from '../store/favorites_store'
import type { Crypto } from '../types/crypto'
import type { AppStatus } from '../types/app'
import { formatCurrency } from '../utils/formatCurrency'

function CryptoDetailPage() {
  const { id = '' } = useParams()
  const [crypto, setCrypto] = useState<Crypto | null>(null)
  const [status, setStatus] = useState<AppStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [requestKey, setRequestKey] = useState(0)

  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(id),
  )
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCrypto() {
      setStatus('loading')
      setErrorMessage('')

      try {
        const result = await fetchCryptoById(id, 'usd', controller.signal)
        setCrypto(result ?? null)
        setStatus(result ? 'success' : 'empty')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar la cotización.',
        )
        setStatus('error')
      }
    }

    void loadCrypto()
    return () => controller.abort()
  }, [id, requestKey])

  return (
    <main className="container main-content">
      <section className="intro">
        <p className="eyebrow">DETALLE DE COTIZACIÓN</p>
        <h1>{crypto?.name ?? 'Criptomoneda'}</h1>
        <p>Información actualizada en dólares estadounidenses.</p>
      </section>

      {status === 'loading' && <p role="status">Cargando cotización...</p>}

      {status === 'error' && (
        <div className="status-card error-message" role="alert">
          <p>{errorMessage}</p>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setRequestKey((value) => value + 1)}
          >
            Reintentar
          </button>
        </div>
      )}

      {status === 'empty' && (
        <div className="status-card">
          <h2>Criptomoneda no encontrada</h2>
          <p>El identificador solicitado no está disponible.</p>
        </div>
      )}

      {status === 'success' && crypto && (
        <section className="detail-card">
          <dl className="detail-list">
            <div><dt>Identificador</dt><dd>{crypto.id}</dd></div>
            <div><dt>Símbolo</dt><dd>{crypto.symbol.toUpperCase()}</dd></div>
            <div>
              <dt>Precio actual</dt>
              <dd>{formatCurrency(crypto.price, 'usd')}</dd>
            </div>
            <div><dt>Favorita</dt><dd>{isFavorite ? 'Sí' : 'No'}</dd></div>
          </dl>

          <div className="card-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => toggleFavorite(crypto.id)}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '★ Quitar de favoritas' : '☆ Agregar a favoritas'}
            </button>
            <Link to="/" className="secondary-button">Volver a cotizaciones</Link>
          </div>
        </section>
      )}

      {status !== 'success' && (
        <Link to="/" className="secondary-button back-link">
          Volver a cotizaciones
        </Link>
      )}
    </main>
  )
}

export default CryptoDetailPage
