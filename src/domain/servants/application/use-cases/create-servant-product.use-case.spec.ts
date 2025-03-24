import { UniqueEntityID } from '@/core/unique-entity-id'
import { makeServant } from 'test/factories/servants.factory'
import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { CreateServantProductUseCase } from './create-servant-product.use-case'
import { makeProduct } from 'test/factories/products.factory'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('CreateServantProductUseCase', () => {
  let servantsRepository: InMemoryServantsRepository
  let servantProductsRepository: InMemoryServantProductsRepository
  let sut: CreateServantProductUseCase

  beforeEach(() => {
    servantsRepository = new InMemoryServantsRepository()
    servantProductsRepository = new InMemoryServantProductsRepository()
    sut = new CreateServantProductUseCase(
      servantsRepository,
      servantProductsRepository,
    )
  })

  it('should create a servant product', async () => {
    const servant = makeServant({}, new UniqueEntityID('1'))
    const product = makeProduct({}, new UniqueEntityID('1'))

    await servantsRepository.create(servant)

    const result = await sut.execute({
      productId: product.id.toString(),
      servantId: servant.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(servantProductsRepository.items).toHaveLength(1)
  })

  it('should not be able create a product for a servant that does not exist', async () => {
    const product = makeProduct({}, new UniqueEntityID('1'))

    const result = await sut.execute({
      productId: product.id.toString(),
      servantId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
