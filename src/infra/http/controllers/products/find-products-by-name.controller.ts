import { FindProductByNameUseCase } from '@/domain/products/application/use-cases/find-product-by-name.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ProductPresenter } from '../../presenters/http-products.presenter'
import {
  NameQueryParam,
  NameQueryValidationPipe,
} from '../../schemas/name-query-param.schema'
import {
  PageQueryParam,
  PageQueryValidationPipe,
} from '../../schemas/page-query-param.schema'

@Controller()
export class FindProductsByNameController {
  constructor(
    private readonly findProductByNameUseCase: FindProductByNameUseCase,
  ) {}

  @Get('products')
  async handle(
    @Query('name', NameQueryValidationPipe) name: NameQueryParam,
    @Query('page', PageQueryValidationPipe) page: PageQueryParam,
  ) {
    const result = await this.findProductByNameUseCase.execute({
      name,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      ...result.value,
      products: result.value.products.map((product) =>
        ProductPresenter.toHTTP(product),
      ),
    }
  }
}
