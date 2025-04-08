import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServant } from '../../enterprise/entities/sale-servant'

export abstract class SaleServantsRepository {
  abstract createMany(saleServants: SaleServant[]): Promise<void>
  abstract deleteMany(saleServants: SaleServant[]): Promise<void>
  abstract findManyBySaleId(saleId: UniqueEntityID): Promise<SaleServant[]>
  abstract deleteManyBySaleId(saleId: UniqueEntityID): Promise<void>
}
