import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServantsRepository } from '@/domain/sales/application/repositories/sale-servants.repository'
import { SaleServant } from '@/domain/sales/enterprise/entities/sale-servant'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemorySaleServantsRepository implements SaleServantsRepository {
  public items: SaleServant[] = []

  async findManyBySaleId(saleId: UniqueEntityID): Promise<SaleServant[]> {
    return Promise.resolve(
      this.items.filter((saleServant) => saleServant.saleId.equals(saleId)),
    )
  }

  async createMany(saleServants: SaleServant[]): Promise<void> {
    await Promise.resolve(this.items.push(...saleServants))
  }

  async deleteMany(saleServants: SaleServant[]): Promise<void> {
    await Promise.resolve(
      (this.items = this.items.filter(
        (saleServant) => !saleServants.some((s) => s.id.equals(saleServant.id)),
      )),
    )
  }

  async deleteManyBySaleId(saleId: UniqueEntityID): Promise<void> {
    await Promise.resolve(
      (this.items = this.items.filter(
        (saleServant) => !saleServant.saleId.equals(saleId),
      )),
    )
  }
}
