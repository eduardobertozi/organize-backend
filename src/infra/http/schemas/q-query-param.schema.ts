import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const QueryParamSchema = z.string().optional().default('')

export type QueryParam = z.infer<typeof QueryParamSchema>

export const QueryValidationPipe = new ZodValidationPipe(QueryParamSchema)
