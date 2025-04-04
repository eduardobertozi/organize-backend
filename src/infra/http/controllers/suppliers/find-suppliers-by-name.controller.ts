import { FindSupplierByNameUseCase } from '@/domain/suppliers/application/use-cases/find-supplier-by-name.use-case'
import {
  NameQueryParam,
  NameQueryValidationPipe,
} from '@/infra/http/schemas/name-query-param.schema'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { SupplierPresenter } from '../../presenters/http-supplier.presenter'

@Controller()
export class FindSupplierByNameController {
  constructor(
    private readonly findSupplierByNameUseCase: FindSupplierByNameUseCase,
  ) {}

  @Get('/suppliers')
  async handle(@Query('name', NameQueryValidationPipe) name: NameQueryParam) {
    const result = await this.findSupplierByNameUseCase.execute({
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      supplier: SupplierPresenter.toHTTP(result.value.supplier),
    }
  }
}
