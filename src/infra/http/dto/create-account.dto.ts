import { z } from 'zod'

export const CreateAccountSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string().min(6),
})

export class CreateAccountDTO {
  name: string
  username: string
  password: string
}
