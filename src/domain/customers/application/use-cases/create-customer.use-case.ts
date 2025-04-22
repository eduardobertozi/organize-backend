import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Customer } from '../../enterprise/entities/customer.entity'
import { CustomersRepository } from '../repositories/customers.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

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

    const userExists = await this.customersRepository.findByUserId(
      customer.userId!,
    )

    if (!userExists) {
      return left(new ResourceNotFoundError())
    }

    await this.customersRepository.create(customer)

    return right({ customer })
  }
}
