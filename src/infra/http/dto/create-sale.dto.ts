import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const CreateSaleSchema = z.object({
  description: z.string().optional().nullable().default(null),
  amount: z.coerce.number(),
  servants: z.array(z.string()),
})

export const CreateSaleValidationPipe = new ZodValidationPipe(CreateSaleSchema)

export class CreateSaleDTO {
  description: string | null
  amount: number
  servants: string[]
}
