import { EditServantUseCase } from '@/domain/servants/application/use-cases/edit-servant.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { ServantPresenter } from '../../presenters/http-servants.presenter'
import {
  ServantIdParam,
  ServantIdParamValidationPipe,
} from '@/infra/http/schemas/servant-id-param.schema'
import {
  CreateServantDTO,
  CreateServantValidationPipe,
} from '@/infra/http/dto/create-servant.dto'

@Controller()
export class EditServantController {
  constructor(private readonly editServantUseCase: EditServantUseCase) {}

  @Put('servants/:servantId')
  @HttpCode(200)
  async handle(
    @Param('servantId', ServantIdParamValidationPipe) servantId: ServantIdParam,
    @Body(CreateServantValidationPipe) servant: CreateServantDTO,
  ) {
    const result = await this.editServantUseCase.execute({
      servantId,
      ...servant,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      message: 'Serviço atualizado com sucesso!',
      servant: ServantPresenter.toHTTP(result.value.servant),
    }
  }
}
