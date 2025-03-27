import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

export const CreateSupplierSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  city: z.string(),
  state: z.string(),
  address: z.string(),
})

export const CreateSupplierValidationPipe = new ZodValidationPipe(
  CreateSupplierSchema,
)

export class CreateSupplierDTO {
  name: string
  phone: string
  email: string
  city: string
  state: string
  address: string
}
