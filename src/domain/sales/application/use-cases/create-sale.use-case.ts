import { Injectable } from '@nestjs/common'
import { SalesRepository } from '../repositories/sales.repository'
import { Sale } from '../../enterprise/entities/sale'
import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { SaleServantList } from '../../enterprise/entities/sale-servant-list'
import { SaleServant } from '../../enterprise/entities/sale-servant'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface CreateSaleUseCaseRequest {
  description?: string | null
  amount: number
  servantsIds: string[]
  customerId: string
  employeeId: string
}

type CreateSaleUseCaseResponse = Either<
  AlreadyExistsError,
  {
    sale: Sale
  }
>

@Injectable()
export class CreateSaleUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(
    params: CreateSaleUseCaseRequest,
  ): Promise<CreateSaleUseCaseResponse> {
    const sale = Sale.create({
      ...params,
      customerId: new UniqueEntityID(params.customerId),
      employeeId: new UniqueEntityID(params.employeeId),
      servants: new SaleServantList(),
    })

    const saleExists = await this.salesRepository.findById(sale.id)

    if (saleExists) {
      return left(new AlreadyExistsError())
    }

    const saleServants = params.servantsIds.map((servantId) =>
      SaleServant.create({
        servantId: new UniqueEntityID(servantId),
        saleId: sale.id,
      }),
    )

    sale.servants = new SaleServantList(saleServants)

    await this.salesRepository.create(sale)

    return right({
      sale,
    })
  }
}
