import { DeleteServantUseCase } from '@/domain/servants/application/use-cases/delete-servant.use-case'
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
} from '@/infra/http/schemas/servant-id-param.schema'

@Controller()
export class DeleteServantController {
  constructor(private readonly deleteServantUseCase: DeleteServantUseCase) {}

  @Delete('servants/:servantId')
  @HttpCode(204)
  async handle(
    @Param('servantId', ServantIdParamValidationPipe) servantId: ServantIdParam,
  ) {
    const result = await this.deleteServantUseCase.execute({ servantId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
