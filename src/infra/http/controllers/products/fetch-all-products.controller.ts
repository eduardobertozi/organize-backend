import { FetchAllProductsUseCase } from '@/domain/products/application/use-cases/fetch-all-products.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ProductPresenter } from '../../presenters/http-products.presenter'
import {
  PageQueryParam,
  PageQueryValidationPipe,
} from '../../schemas/page-query-param.schema'
import {
  QueryParam,
  QueryValidationPipe,
} from '../../schemas/q-query-param.schema'

@Controller()
export class FetchAllProductsController {
  constructor(
    private readonly fetchAllProductsUseCase: FetchAllProductsUseCase,
  ) {}

  @Get('products/all')
  async handle(
    @Query('page', PageQueryValidationPipe) page: PageQueryParam,
    @Query('q', QueryValidationPipe) q: QueryParam,
  ) {
    const result = await this.fetchAllProductsUseCase.execute({
      page,
      q,
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
