import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchCryptoById, fetchCryptos } from './cryptoService'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('cryptoService', () => {
  it('transforma la respuesta de CoinGecko al modelo de la aplicación', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          bitcoin: { usd: 100 },
          ethereum: { usd: 200 },
          solana: { usd: 300 },
        }),
      }),
    )

    const result = await fetchCryptos('usd')

    expect(result).toHaveLength(3)
    expect(result[0]).toEqual({
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      price: 100,
    })
    await expect(fetchCryptoById('solana', 'usd')).resolves.toMatchObject({
      id: 'solana',
      price: 300,
    })
  })

  it('informa los errores HTTP de la API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 429 }),
    )

    await expect(fetchCryptos('usd')).rejects.toThrow('Error HTTP 429')
  })
})
