import { DeleteSaleServantUseCase } from '@/domain/sale-servants/application/use-cases/delete-sale-servant.use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller()
export class DeleteSaleServantController {
  constructor(
    private readonly deleteSaleServantUseCase: DeleteSaleServantUseCase,
  ) {}

  @Delete('sale-servants/:saleServantId')
  @HttpCode(204)
  async handle(@Param('saleServantId') saleServantId: string) {
    const result = await this.deleteSaleServantUseCase.execute({
      saleServantId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
