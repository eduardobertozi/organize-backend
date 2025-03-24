import { z } from 'zod'

export const CreateProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  reference: z.string(),
  supplierId: z.string().uuid(),
  servantId: z.string().uuid(),
  attachments: z.array(z.string().uuid()),
})

export class CreateProductDto {
  name: string
  price: number
  reference: string
  supplierId: string
  servantId: string
  attachments: string[]
}
