import { CreateSaleUseCase } from '@/domain/sales/application/use-cases/create-sale.use-case'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/strategy'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import {
  CreateSaleDTO,
  CreateSaleValidationPipe,
} from '../../dto/create-sale.dto'
import { SalePresenter } from '../../presenters/http-sale.presenter'

@Controller()
export class CreateSaleController {
  constructor(private readonly createSaleUseCase: CreateSaleUseCase) {}

  @Post('sales')
  async handle(
    @Body(CreateSaleValidationPipe) body: CreateSaleDTO,
    @CurrentUser() user: UserPayload,
  ) {
    const employeeId = user.sub

    const result = await this.createSaleUseCase.execute({
      ...body,
      servantsIds: body.servants,
      employeeId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      sale: SalePresenter.toHTTP(result.value.sale),
    }
  }
}
