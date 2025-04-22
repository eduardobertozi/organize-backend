import { FetchCustomersUseCase } from '@/domain/customers/application/use-cases/fetch-customers.use-case'
import { Public } from '@/infra/auth/public'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { CustomerPresenter } from '../../presenters/http-customers.presenter'

@Controller()
@Public()
export class FetchCustomersController {
  constructor(private readonly fetchCustomers: FetchCustomersUseCase) {}

  @Get('/customers')
  async handle(@Query('q') q: string, @Query('page') page: number) {
    const result = await this.fetchCustomers.execute({
      page,
      q,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      customers: result.value.customers.map((customer) =>
        CustomerPresenter.toHTTP(customer),
      ),
    }
  }
}
