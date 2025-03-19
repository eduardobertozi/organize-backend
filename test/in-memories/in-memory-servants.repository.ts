import { PaginationParams } from '@/core/pagination-params'
import { ServantRepository } from '@/domain/servants/application/repositories/servants.repository'
import { Servant } from '@/domain/servants/enterprise/entities/servant'

export class InMemoryServantRepository extends ServantRepository {
  public items: Servant[] = []

  async findById(id: string) {
    return Promise.resolve(
      this.items.find((item) => item.id.toString() === id) ?? null,
    )
  }

  async findByName(name: string, params?: PaginationParams) {
    const page = params?.page ?? 1

    const filteredItems = this.items.filter((item) => item.name?.includes(name))
    return Promise.resolve(filteredItems.slice((page - 1) * 10, page * 10))
  }

  async findAll({ page }: PaginationParams) {
    return Promise.resolve(this.items.slice((page - 1) * 10, page * 10))
  }

  async create(servant: Servant) {
    await Promise.resolve(this.items.push(servant))
  }

  async save(servant: Servant): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index !== -1) {
      await Promise.resolve((this.items[index] = servant))
    }
  }

  async delete(servant: Servant): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index !== -1) {
      await Promise.resolve(this.items.splice(index, 1))
    }
  }
}
