import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeServantProduct } from 'test/factories/servant-product.factory'
import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'
import { DeleteServantProductUseCase } from './delete-servant-product.use-case'

describe('DeleteServantProductUseCase', () => {
  let servantProductsRepository: InMemoryServantProductsRepository
  let sut: DeleteServantProductUseCase

  beforeEach(() => {
    servantProductsRepository = new InMemoryServantProductsRepository()
    sut = new DeleteServantProductUseCase(servantProductsRepository)
  })

  it('should delete a servant product', async () => {
    const servantProduct = makeServantProduct()
    await servantProductsRepository.create(servantProduct)

    const result = await sut.execute({
      servantProductId: servantProduct.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(servantProductsRepository.items).toHaveLength(0)
  })

  it('should not be able delete a servant product that does not exist', async () => {
    const servantProduct = makeServantProduct()
    await servantProductsRepository.create(servantProduct)

    const result = await sut.execute({
      servantProductId: 'invalid-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
