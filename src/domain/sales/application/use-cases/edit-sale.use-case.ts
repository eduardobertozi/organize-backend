import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { Sale } from '../../enterprise/entities/sale'
import { SalesRepository } from '../repositories/sales.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServantList } from '../../enterprise/entities/sale-servant-list'
import { SaleServant } from '../../enterprise/entities/sale-servant'
import { SaleServantsRepository } from '../repositories/sale-servants.repository'

interface EditSaleUseCaseRequest {
  saleId: string
  description?: string | null
  amount: number
  servantsIds: string[]
}

type EditSaleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sale: Sale
  }
>

@Injectable()
export class EditSaleUseCase {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly saleServantsRepository: SaleServantsRepository,
  ) {}

  async execute(
    params: EditSaleUseCaseRequest,
  ): Promise<EditSaleUseCaseResponse> {
    const sale = await this.salesRepository.findById(
      new UniqueEntityID(params.saleId),
    )

    if (!sale) {
      return left(new ResourceNotFoundError())
    }

    if (params.servantsIds.length > 0) {
      const currentSaleServants =
        await this.saleServantsRepository.findManyBySaleId(
          new UniqueEntityID(params.saleId),
        )

      const saleServantsList = new SaleServantList(currentSaleServants)

      const saleServants = params.servantsIds.map((servantId) =>
        SaleServant.create({
          servantId: new UniqueEntityID(servantId),
          saleId: sale.id,
        }),
      )

      saleServantsList.update(saleServants)
      sale.servants = new SaleServantList(saleServants)
    }

    sale.description = params.description!
    sale.amount = params.amount

    await this.salesRepository.save(sale)

    return right({
      sale,
    })
  }
}
