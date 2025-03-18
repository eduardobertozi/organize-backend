import { z } from 'zod'

export const CreateServantDto = z.object({
  name: z.string(),
  productIds: z.array(z.string()),
  productsPrice: z.number(),
  workForcePrice: z.number(),
  profitPercent: z.number(),
})
