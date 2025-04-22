import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const CreateCustomerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  userId: z.string().uuid(),
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
