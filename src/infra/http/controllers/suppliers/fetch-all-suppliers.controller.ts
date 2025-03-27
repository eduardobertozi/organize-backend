import { FetchAllSuppliersUseCase } from '@/domain/suppliers/application/use-cases/fetch-all-suppliers.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { SupplierPresenter } from '../../presenters/http-supplier.presenter'
import {
  PageQueryParam,
  PageQueryValidationPipe,
} from '../../schemas/page-query-param.schema'

@Controller()
export class FetchAllSupplierController {
  constructor(
    private readonly fetchAllSuppliersUseCase: FetchAllSuppliersUseCase,
  ) {}

  @Get('/suppliers')
  async handle(@Query('page', PageQueryValidationPipe) page: PageQueryParam) {
    const result = await this.fetchAllSuppliersUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      suppliers: result.value.suppliers.map((supplier) =>
        SupplierPresenter.toHTTP(supplier),
      ),
    }
  }
}
