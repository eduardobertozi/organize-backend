import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const ProductIdParamSchema = z.string().uuid()

export type ProductIdParam = z.infer<typeof ProductIdParamSchema>

export const ProductIdParamValidationPipe = new ZodValidationPipe(
  ProductIdParamSchema,
)
