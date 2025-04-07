import { EditSupplierUseCase } from '@/domain/suppliers/application/use-cases/edit-supplier.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
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
  @HttpCode(204)
  async handle(
    @Param('supplierId', SupplierIdParamValidationPipe)
    supplierId: SupplierIdParam,
    @Body(CreateSupplierValidationPipe) body: CreateSupplierDTO,
  ) {
    const result = await this.editSupplierUseCase.execute({
      supplierId,
      ...body,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    return {
      message: 'Fornecedor atualizado com sucesso!',
      supplier: SupplierPresenter.toHTTP(result.value.supplier),
    }
  }
}
