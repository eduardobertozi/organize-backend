import { FindSupplierByNameUseCase } from '@/domain/suppliers/application/use-cases/find-supplier-by-name.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { SupplierPresenter } from '../../presenters/http-supplier.presenter'
import {
  PageQueryParam,
  PageQueryValidationPipe,
} from '../../schemas/page-query-param.schema'
import {
  NameQueryParam,
  NameQueryValidationPipe,
} from '@/infra/http/schemas/name-query-param.schema'

@Controller()
export class FindSupplierByNameController {
  constructor(
    private readonly findSupplierByNameUseCase: FindSupplierByNameUseCase,
  ) {}

  @Get('/suppliers')
  async handle(
    @Query('name', NameQueryValidationPipe) name: NameQueryParam,
    @Query('page', PageQueryValidationPipe) page: PageQueryParam,
  ) {
    const result = await this.findSupplierByNameUseCase.execute({
      name,
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
