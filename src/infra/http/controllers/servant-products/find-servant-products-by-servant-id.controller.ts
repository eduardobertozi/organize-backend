import { FindServantProductsByServantIdUseCase } from '@/domain/servants/application/use-cases/find-servant-products-by-servant-id.use-case'
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UsePipes,
} from '@nestjs/common'
import { ServantProductsPresenter } from '../../presenters/http-servant-products.presenter'
import {
  ServantIdParam,
  ServantIdParamValidationPipe,
} from '../../schemas/servant-id-param.schema'

@Controller()
export class FindServantProductsByServantId {
  constructor(
    private readonly findServantProductsByServantIdUseCase: FindServantProductsByServantIdUseCase,
  ) {}

  @Get('servant-products/:servantId')
  @UsePipes(ServantIdParamValidationPipe)
  async handle(@Param('servantId') servantId: ServantIdParam) {
    const result = await this.findServantProductsByServantIdUseCase.execute({
      servantId,
    })

    if (result.isLeft()) {
      throw new NotFoundException()
    }

    return result.value.servantProducts.map((servantProduct) =>
      ServantProductsPresenter.toHTTP(servantProduct),
    )
  }
}
