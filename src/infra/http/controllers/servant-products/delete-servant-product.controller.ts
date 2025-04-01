import { DeleteServantProductUseCase } from '@/domain/servant-products/application/use-cases/delete-servant-product.use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import {
  ServantIdParam,
  ServantIdParamValidationPipe,
} from '../../schemas/servant-id-param.schema'
import {
  ProductIdParam,
  ProductIdParamValidationPipe,
} from '../../schemas/product-id-param.schema'

@Controller()
export class DeleteServantProductController {
  constructor(
    private readonly deleteServantProductUseCase: DeleteServantProductUseCase,
  ) {}

  @Delete('servant-products/:productId/product/:servantId/servant')
  @HttpCode(204)
  async handle(
    @Param('servantId', ServantIdParamValidationPipe) servantId: ServantIdParam,
    @Param('productId', ProductIdParamValidationPipe) productId: ProductIdParam,
  ) {
    const result = await this.deleteServantProductUseCase.execute({
      servantId,
      productId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
