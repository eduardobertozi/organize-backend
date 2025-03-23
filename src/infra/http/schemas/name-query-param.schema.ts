import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const NameQueryParamSchema = z.string().optional().default('')

export type NameQueryParam = z.infer<typeof NameQueryParamSchema>

export const NameQueryValidationPipe = new ZodValidationPipe(
  NameQueryParamSchema,
)
