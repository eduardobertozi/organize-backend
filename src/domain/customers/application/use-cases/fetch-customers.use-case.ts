import { Either, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { PaginationResponse } from '@/core/pagination-response'
import { Injectable } from '@nestjs/common'
import { Customer } from '../../enterprise/entities/customer.entity'
import { CustomersRepository } from '../repositories/customers.repository'

interface FetchCustomersRequest {
  page?: number
  q?: string
}

type FetchCustomersResponse = Either<
  AlreadyExistsError,
  PaginationResponse & {
    customers: Customer[]
  }
>

@Injectable()
export class FetchCustomersUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute({
    q,
    page,
  }: FetchCustomersRequest): Promise<FetchCustomersResponse> {
    const { customers, total } = await this.customersRepository.findAll({
      page,
      q,
    })

    const paginationResponse = PaginationResponse.create({
      total,
      page: page!,
    })

    return right({
      ...paginationResponse,
      total,
      customers,
    })
  }
}
