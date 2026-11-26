import { z } from 'zod'

export const querySchema = z.object({
  searchTerm: z
    .string()
    .trim()
    .refine(
      (value) => value.length === 0 || value.length >= 2,
      'Ingresá al menos 2 caracteres para buscar, o dejá el campo vacío.',
    ),

  selectedCurrency: z.enum(['usd', 'eur', 'ars'], {
    message: 'Seleccioná una moneda válida.',
  }),
})

export type QueryFormData = z.infer<typeof querySchema>
