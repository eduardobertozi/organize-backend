import { z } from 'zod'

export const AuthenticateUserSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
})

export class AuthenticateUserDTO {
  username: string
  password: string
}
