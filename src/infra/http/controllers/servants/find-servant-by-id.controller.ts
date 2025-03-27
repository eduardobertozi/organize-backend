import { FindServantByIdUseCase } from '@/domain/servants/application/use-cases/find-servant-by-id.use-case'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ServantPresenter } from '../../presenters/http-servants.presenter'
import {
  ServantIdParam,
  ServantIdParamValidationPipe,
} from '@/infra/http/schemas/servant-id-param.schema'

@Controller()
export class FindServantByIdController {
  constructor(
    private readonly findServantByIdUseCase: FindServantByIdUseCase,
  ) {}

  @Get('servants/:servantId')
  async handle(
    @Param('servantId', ServantIdParamValidationPipe) servantId: ServantIdParam,
  ) {
    const result = await this.findServantByIdUseCase.execute({
      servantId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      servant: ServantPresenter.toHTTP(result.value.servant),
    }
  }
}
