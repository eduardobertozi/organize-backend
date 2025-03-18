import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '../servant.entity'
import { ServantRepository } from '../servants.repository'

export class InMemoryServantRepository extends ServantRepository {
  public items: Servant[] = []

  async findById(id: UniqueEntityID) {
    return this.items.find((item) => item.id.equals(id)) ?? null
  }

  async findByName(name: string, page = 1) {
    const filteredItems = this.items.filter((item) => item.name?.includes(name))
    return filteredItems.slice((page - 1) * 10, page * 10)
  }

  async findAll(page = 1) {
    return this.items.slice((page - 1) * 10, page * 10)
  }

  async create(servant: Servant) {
    this.items.push(servant)
  }

  async save(servant: Servant): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index !== -1) {
      this.items[index] = servant
    }
  }

  async delete(servant: Servant): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(servant.id))

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
