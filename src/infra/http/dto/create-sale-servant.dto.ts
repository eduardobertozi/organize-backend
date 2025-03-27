import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const CreateSaleServantSchema = z.object({
  saleId: z.string().uuid(),
  servantId: z.string().uuid(),
})

export const CreateSaleServantValidationPipe = new ZodValidationPipe(
  CreateSaleServantSchema,
)

export class CreateSaleServantDTO {
  saleId: string
  servantId: string
}
