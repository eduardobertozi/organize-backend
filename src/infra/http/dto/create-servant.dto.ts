import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const CreateServantSchema = z.object({
  name: z.string(),
  productsPrice: z.number(),
  workForcePrice: z.number(),
  profitPercent: z.number(),
  products: z.array(z.string().uuid()),
})

export const CreateServantValidationPipe = new ZodValidationPipe(
  CreateServantSchema,
)

export class CreateServantDTO {
  name: string
  productsPrice: number
  workForcePrice: number
  profitPercent: number
  products: string[]
}
