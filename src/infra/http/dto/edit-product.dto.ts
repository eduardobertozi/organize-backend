import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const EditProductSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.number().positive(),
  supplierId: z.string().uuid(),
  reference: z.string(),
  attachments: z.array(z.string().uuid()),
})

export const EditProductValidationPipe = new ZodValidationPipe(
  EditProductSchema,
)

export class EditProductDTO {
  name: string
  price: number
  supplierId: string
  reference: string
  attachments: string[]
}
