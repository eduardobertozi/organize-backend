import { FindProductByNameUseCase } from '@/domain/products/application/use-cases/find-product-by-name.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ProductPresenter } from '../../presenters/http-products.presenter'
import {
  NameQueryParam,
  NameQueryValidationPipe,
} from '../../schemas/name-query-param.schema'

@Controller()
export class FindProductsByNameController {
  constructor(
    private readonly findProductByNameUseCase: FindProductByNameUseCase,
  ) {}

  @Get('products')
  async handle(@Query('name', NameQueryValidationPipe) name: NameQueryParam) {
    const result = await this.findProductByNameUseCase.execute({
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      product: ProductPresenter.toHTTP(result.value.product),
    }
  }
}
