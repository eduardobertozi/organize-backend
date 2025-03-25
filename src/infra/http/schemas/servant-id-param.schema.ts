import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const ServantIdParamSchema = z.string().uuid()

export const ServantIdParamValidationPipe = new ZodValidationPipe(
  ServantIdParamSchema,
)
