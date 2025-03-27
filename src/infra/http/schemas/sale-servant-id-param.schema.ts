import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const SaleServantIdParamSchema = z.string().uuid()

export type SaleServantIdParam = z.infer<typeof SaleServantIdParamSchema>

export const SaleServantIdParamValidationPipe = new ZodValidationPipe(
  SaleServantIdParamSchema,
)
