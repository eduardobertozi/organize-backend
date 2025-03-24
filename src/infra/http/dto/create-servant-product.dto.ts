import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const CreateServantProductSchema = z.object({
  servantId: z.string().uuid(),
  productId: z.string().uuid(),
})

export const CreateServantProductValidationPipe = new ZodValidationPipe(
  CreateServantProductSchema,
)

export class CreateServantProductDTO {
  servantId: string
  productId: string
}
