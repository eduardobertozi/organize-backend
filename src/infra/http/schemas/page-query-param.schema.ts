import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const PageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

export type PageQueryParam = z.infer<typeof PageQueryParamSchema>

export const PageQueryValidationPipe = new ZodValidationPipe(
  PageQueryParamSchema,
)
