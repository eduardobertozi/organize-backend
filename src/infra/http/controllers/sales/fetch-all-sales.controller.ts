import { FetchAllSalesUseCase } from '@/domain/sales/application/use-cases/fetch-all-sales.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import {
  PageQueryParam,
  PageQueryValidationPipe,
} from '../../schemas/page-query-param.schema'
import { SalePresenter } from '../../presenters/http-sale.presenter'

@Controller()
export class FetchAllSalesController {
  constructor(private readonly fetchAllSalesUseCase: FetchAllSalesUseCase) {}

  @Get('sales')
  async handle(@Query('page', PageQueryValidationPipe) page: PageQueryParam) {
    const result = await this.fetchAllSalesUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      sales: result.value.sales.map((sale) => SalePresenter.toHTTP(sale)),
    }
  }
}
