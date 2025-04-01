import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Product } from '@/domain/products/enterprise/entities/product'

const CreateServantSchema = z.object({
  name: z.string(),
  productsPrice: z.number(),
  workForcePrice: z.number(),
  profitPercent: z.number(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      price: z.coerce.number(),
      reference: z.string(),
      supplierId: z.string().uuid(),
      servantId: z.string().uuid().optional(),
      attachments: z.array(z.string().uuid()),
    }),
  ),
})

export const CreateServantValidationPipe = new ZodValidationPipe(
  CreateServantSchema,
)

export class CreateServantDTO {
  name: string
  productsPrice: number
  products: Array<Product>
  workForcePrice: number
  profitPercent: number
}
