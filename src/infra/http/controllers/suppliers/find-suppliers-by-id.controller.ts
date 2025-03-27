import { FindSupplierByIdUseCase } from '@/domain/suppliers/application/use-cases/find-supplier-by-id.use-case'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { SupplierPresenter } from '../../presenters/http-supplier.presenter'
import {
  SupplierIdParam,
  SupplierIdParamValidationPipe,
} from '@/infra/http/schemas/supplier-id-param.schema'

@Controller()
export class FindSupplierByIdController {
  constructor(
    private readonly findSupplierByIdUseCase: FindSupplierByIdUseCase,
  ) {}

  @Get('/suppliers/:supplierId')
  async handle(
    @Param('supplierId', SupplierIdParamValidationPipe)
    supplierId: SupplierIdParam,
  ) {
    const result = await this.findSupplierByIdUseCase.execute({
      supplierId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      supplier: SupplierPresenter.toHTTP(result.value.supplier),
    }
  }
}
