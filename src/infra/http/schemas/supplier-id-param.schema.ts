import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const SupplierIdParamSchema = z.string().uuid()

export type SupplierIdParam = z.infer<typeof SupplierIdParamSchema>

export const SupplierIdParamValidationPipe = new ZodValidationPipe(
  SupplierIdParamSchema,
)
