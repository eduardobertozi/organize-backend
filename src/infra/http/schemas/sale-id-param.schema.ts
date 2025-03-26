import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const SaleIdParamSchema = z.string().uuid()

export type SaleIdParam = z.infer<typeof SaleIdParamSchema>

export const SaleIdParamValidationPipe = new ZodValidationPipe(
  SaleIdParamSchema,
)
