import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CreateProductSchema } from './create-product.dto'
import { Product } from '@/domain/products/enterprise/entities/product'

const CreateServantSchema = z.object({
  name: z.string(),
  productIds: z.array(z.string()),
  productsPrice: z.number(),
  workForcePrice: z.number(),
  profitPercent: z.number(),
  products: z.array(CreateProductSchema),
})

export const CreateServantValidationPipe = new ZodValidationPipe(
  CreateServantSchema,
)

export class CreateServantDTO {
  name: string
  productsPrice: number
  workForcePrice: number
  profitPercent: number
  products: Product[]
}
