import { EditSupplierUseCase } from '@/domain/suppliers/application/use-cases/edit-supplier.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
} from '@nestjs/common'
import {
  CreateSupplierDTO,
  CreateSupplierValidationPipe,
} from '../../dto/create-supplier.dto'
import { SupplierPresenter } from '../../presenters/http-supplier.presenter'
import {
  SupplierIdParam,
  SupplierIdParamValidationPipe,
} from '../../schemas/supplier-id-param.schema'

@Controller()
export class EditSupplierController {
  constructor(private readonly editSupplierUseCase: EditSupplierUseCase) {}

  @Put('/suppliers/:supplierId')
  @UsePipes(CreateSupplierValidationPipe)
  async handle(
    @Param('supplierId', SupplierIdParamValidationPipe)
    supplierId: SupplierIdParam,
    @Body() body: CreateSupplierDTO,
  ) {
    const result = await this.editSupplierUseCase.execute({
      supplierId,
      ...body,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return SupplierPresenter.toHTTP(result.value.supplier)
  }
}
