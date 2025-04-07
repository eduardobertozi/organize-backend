import { CreateSupplierUseCase } from '@/domain/suppliers/application/use-cases/create-supplier.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  CreateSupplierDTO,
  CreateSupplierSchema,
} from '../../dto/create-supplier.dto'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { SupplierPresenter } from '../../presenters/http-supplier.presenter'

@Controller()
export class CreateSupplierController {
  constructor(private readonly createSupplierUseCase: CreateSupplierUseCase) {}

  @Post('/suppliers')
  @UsePipes(new ZodValidationPipe(CreateSupplierSchema))
  async handle(@Body() body: CreateSupplierDTO) {
    const result = await this.createSupplierUseCase.execute(body)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      message: 'Fornecedor criado com sucesso!',
      supplier: SupplierPresenter.toHTTP(result.value.supplier),
    }
  }
}
