import { DeleteServantProductUseCase } from '@/domain/servant-products/application/use-cases/delete-servant-product.use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UsePipes,
} from '@nestjs/common'
import { ServantIdParamValidationPipe } from '../../schemas/servant-id-param.schema'

@Controller()
export class DeleteServantProductController {
  constructor(
    private readonly deleteServantProductUseCase: DeleteServantProductUseCase,
  ) {}

  @Delete('servant-products/:servantId')
  @UsePipes(ServantIdParamValidationPipe)
  @HttpCode(204)
  async handle(@Param('servantId') servantId: string) {
    const result = await this.deleteServantProductUseCase.execute({ servantId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
