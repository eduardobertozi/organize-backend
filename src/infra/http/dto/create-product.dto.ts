import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const CreateProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  reference: z.string(),
  supplierId: z.string().uuid(),
  stock: z.coerce.number(),
  attachments: z.array(z.string().uuid()),
})

export const CreateProductValidationPipe = new ZodValidationPipe(
  CreateProductSchema,
)

export class CreateProductDto {
  name: string
  price: number
  reference: string
  supplierId: string
  stock: number
  attachments: string[]
}
