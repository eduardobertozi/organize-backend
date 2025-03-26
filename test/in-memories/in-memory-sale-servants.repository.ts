import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServantsRepository } from '@/domain/sale-servants/application/repositories/sale-servants.repository'
import { SaleServant } from '@/domain/sale-servants/enterprise/entities/sale-servant'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemorySaleServantsRepository implements SaleServantsRepository {
  public items: SaleServant[] = []

  async findById(id: UniqueEntityID): Promise<SaleServant | null> {
    return Promise.resolve(
      this.items.find((saleServant) => saleServant.id.equals(id)) ?? null,
    )
  }

  async findBySaleId(saleId: UniqueEntityID): Promise<SaleServant[]> {
    return Promise.resolve(
      this.items.filter(
        (saleServant) => saleServant.saleId === saleId.toString(),
      ),
    )
  }

  async create(saleServant: SaleServant): Promise<SaleServant> {
    this.items.push(saleServant)
    return Promise.resolve(saleServant)
  }

  async delete(saleServant: SaleServant): Promise<void> {
    const index = this.items.findIndex((item) => item.id === saleServant.id)
    await Promise.resolve(this.items.splice(index, 1))
  }
}
