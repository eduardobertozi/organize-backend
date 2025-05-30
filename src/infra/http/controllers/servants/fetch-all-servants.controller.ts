import { FetchAllServantsUseCase } from '@/domain/servants/application/use-cases/fetch-all-servants.use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ServantPresenter } from '../../presenters/http-servants.presenter'
import {
  PageQueryParam,
  PageQueryValidationPipe,
} from '../../schemas/page-query-param.schema'
import {
  QueryParam,
  QueryValidationPipe,
} from '../../schemas/q-query-param.schema'

@Controller()
export class FetchAllServantsController {
  constructor(
    private readonly fetchAllServantsUseCase: FetchAllServantsUseCase,
  ) {}

  @Get('servants/all')
  async handle(
    @Query('page', PageQueryValidationPipe) page: PageQueryParam,
    @Query('q', QueryValidationPipe) q: QueryParam,
  ) {
    const result = await this.fetchAllServantsUseCase.execute({ q, page })

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
