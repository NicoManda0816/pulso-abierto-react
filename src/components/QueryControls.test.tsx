import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import QueryControls from './QueryControls'

afterEach(cleanup)

function renderControls(onSearch = vi.fn()) {
  render(
    <QueryControls
      searchTerm=""
      selectedCurrency="usd"
      onlyFavorites={false}
      onSearchChange={vi.fn()}
      onCurrencyChange={vi.fn()}
      onFavoritesChange={vi.fn()}
      onSearch={onSearch}
    />,
  )

  return onSearch
}

describe('QueryControls', () => {
  it('muestra la validación cuando la búsqueda tiene un solo carácter', async () => {
    const user = userEvent.setup()
    render(
      <QueryControls
        searchTerm="b"
        selectedCurrency="usd"
        onlyFavorites={false}
        onSearchChange={vi.fn()}
        onCurrencyChange={vi.fn()}
        onFavoritesChange={vi.fn()}
        onSearch={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Ingresá al menos 2 caracteres',
    )
  })

  it('envía una búsqueda vacía válida', async () => {
    const user = userEvent.setup()
    const onSearch = renderControls()

    await user.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onSearch).toHaveBeenCalledOnce()
  })
})
