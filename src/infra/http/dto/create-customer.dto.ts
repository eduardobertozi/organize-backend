import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const CreateCustomerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  userId: z.string().uuid().optional(),
})

export const CreateCustomerValidationPipe = new ZodValidationPipe(
  CreateCustomerSchema,
)

export class CreateCustomerDTO {
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  userId: string
}
