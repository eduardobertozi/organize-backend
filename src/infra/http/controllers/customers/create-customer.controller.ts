import { UniqueEntityID } from '@/core/unique-entity-id'
import { CreateCustomerUseCase } from '@/domain/customers/application/use-cases/create-customer.use-case'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  CreateCustomerDTO,
  CreateCustomerValidationPipe,
} from '../../dto/create-customer.dto'
import { CustomerPresenter } from '../../presenters/http-customers.presenter'

@Controller()
@Public()
export class CreateCustomerController {
  constructor(private readonly createCustomer: CreateCustomerUseCase) {}

  @Post('/customers')
  @HttpCode(201)
  @UsePipes(CreateCustomerValidationPipe)
  async handle(@Body() body: CreateCustomerDTO) {
    const result = await this.createCustomer.execute({
      ...body,
      userId: new UniqueEntityID(body.userId),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      customer: CustomerPresenter.toHTTP(result.value.customer),
    }
  }
}
