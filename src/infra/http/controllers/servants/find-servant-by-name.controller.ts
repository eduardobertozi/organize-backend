import { FindServantByNameUseCase } from '@/domain/servants/application/use-cases/find-servant-by-name.use-case'
import {
  NameQueryParam,
  NameQueryValidationPipe,
} from '@/infra/http/schemas/name-query-param.schema'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ServantPresenter } from '../../presenters/http-servants.presenter'

@Controller()
export class FindServantByNameController {
  constructor(private readonly findServantByName: FindServantByNameUseCase) {}

  @Get('servants')
  async handle(@Query('name', NameQueryValidationPipe) name: NameQueryParam) {
    const result = await this.findServantByName.execute({ name })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      servant: ServantPresenter.toHTTP(result.value.servant),
    }
  }
}
