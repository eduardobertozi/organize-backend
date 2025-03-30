import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantsRepository } from '@/domain/servants/application/repositories/servants.repository'
import { Servant } from '@/domain/servants/enterprise/entities/servant'
import { FindManyResponse } from '@/core/find-many-response'

export class InMemoryServantsRepository extends ServantsRepository {
  public items: Servant[] = []

  async findById(id: UniqueEntityID) {
    return Promise.resolve(
      this.items.find((item) => item.id.equals(id)) ?? null,
    )
  }

  async findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<FindManyResponse<Servant>> {
    const page = params?.page ?? 1

    const filteredItems = this.items.filter((item) => item.name?.includes(name))

    return Promise.resolve({
      servants: filteredItems.slice((page - 1) * 10, page * 10),
      total: this.items.length,
    })
  }

  async findAll({
    page,
  }: PaginationParams): Promise<FindManyResponse<Servant>> {
    return Promise.resolve({
      servants: this.items.slice((page - 1) * 10, page * 10),
      total: this.items.length,
    })
  }

  async create(servant: Servant) {
    await Promise.resolve(this.items.push(servant))
    return servant
  }

  async save(servant: Servant): Promise<Servant> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index < 0) {
      throw new Error('Servant not found')
    }

    await Promise.resolve((this.items[index] = servant))
    return servant
  }

  async delete(servant: Servant): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index !== -1) {
      await Promise.resolve(this.items.splice(index, 1))
    }
  }
}
