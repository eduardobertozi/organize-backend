import { FindServantByNameUseCase } from '@/domain/servants/application/use-cases/find-servant-by-name.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ServantPresenter } from '../../presenters/http-servants.presenter'
import {
  PageQueryParam,
  PageQueryValidationPipe,
} from '../../schemas/page-query-param.schema'
import {
  NameQueryParam,
  NameQueryValidationPipe,
} from '@/infra/http/schemas/name-query-param.schema'

@Controller()
export class FindServantByNameController {
  constructor(private readonly findServantByName: FindServantByNameUseCase) {}

  @Get('servants')
  async handle(
    @Query('name', NameQueryValidationPipe) name: NameQueryParam,
    @Query('page', PageQueryValidationPipe) page: PageQueryParam,
  ) {
    const result = await this.findServantByName.execute({
      name,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      ...result.value,
      servants: result.value.servants.map((servant) =>
        ServantPresenter.toHTTP(servant),
      ),
    }
  }
}
