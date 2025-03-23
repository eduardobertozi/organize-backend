import { FindProductByIdUseCase } from '@/domain/products/application/use-cases/find-product-by-id.use-case'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ProductPresenter } from '../../presenters/http-products.presenter'

@Controller()
export class FindProductByIdController {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @Get('products/:productId/product')
  async handle(@Param('productId') productId: string) {
    const result = await this.findProductByIdUseCase.execute({ productId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return ProductPresenter.toHTTP(result.value.product)
  }
}
