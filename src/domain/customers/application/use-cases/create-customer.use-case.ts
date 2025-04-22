import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Customer } from '../../enterprise/entities/customer.entity'
import { CustomersRepository } from '../repositories/customers.repository'

interface CreateCustomerRequest {
  name: string
  phone: string
  email?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  userId: UniqueEntityID
}

type CreateCustomerResponse = Either<
  AlreadyExistsError,
  {
    customer: Customer
  }
>

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(props: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const customer = Customer.create(props)

    const customerExists = await this.customersRepository.findByUserId(
      props.userId,
    )

    if (customerExists) {
      return left(new AlreadyExistsError())
    }

    await this.customersRepository.create(customer)

    return right({ customer })
  }
}
