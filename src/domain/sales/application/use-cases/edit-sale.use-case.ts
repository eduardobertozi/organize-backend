import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { Sale } from '../../enterprise/entities/sale'
import { SalesRepository } from '../repositories/sales.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface EditSaleUseCaseRequest {
  saleId: string
  description?: string | null
  amount: number
}

type EditSaleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sale: Sale
  }
>

@Injectable()
export class EditSaleUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(
    params: EditSaleUseCaseRequest,
  ): Promise<EditSaleUseCaseResponse> {
    const sale = await this.salesRepository.findById(
      new UniqueEntityID(params.saleId),
    )

    if (!sale) {
      return left(new ResourceNotFoundError())
    }

    const updatedSale = Sale.create(
      {
        ...sale,
        description: params.description,
        amount: params.amount,
      },
      sale.id,
    )

    await this.salesRepository.save(updatedSale)

    return right({
      sale: updatedSale,
    })
  }
}
