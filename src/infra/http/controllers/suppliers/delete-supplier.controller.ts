import { DeleteSupplierUseCase } from '@/domain/suppliers/application/use-cases/delete-supplier.use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import {
  SupplierIdParam,
  SupplierIdParamValidationPipe,
} from '../../schemas/supplier-id-param.schema'

@Controller()
export class DeleteSupplierController {
  constructor(private readonly deleteSupplierUseCase: DeleteSupplierUseCase) {}

  @Delete('/suppliers/:supplierId')
  @HttpCode(204)
  async handle(
    @Param('supplierId', SupplierIdParamValidationPipe)
    supplierId: SupplierIdParam,
  ) {
    const result = await this.deleteSupplierUseCase.execute({
      supplierId,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
  }
}
