import { z } from 'zod'

export const CreateAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export class CreateAccountDTO {
  name: string
  email: string
  password: string
}
