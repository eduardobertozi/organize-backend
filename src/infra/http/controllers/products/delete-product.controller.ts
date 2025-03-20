import { DeleteProductUseCase } from '@/domain/products/application/use-cases/delete-product.use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller()
export class DeleteProductController {
  constructor(private readonly deleteProductUseCase: DeleteProductUseCase) {}

  @Delete('products/:productId')
  @HttpCode(204)
  async handle(@Param('productId') productId: string) {
    const result = await this.deleteProductUseCase.execute({ productId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
