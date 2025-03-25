import { makeServantProduct } from 'test/factories/servant-product.factory'
import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'
import { DeleteServantProductUseCase } from './delete-servant-product.use-case'

describe('Delete Servant Product', () => {
  let inMemoryServantProductsRepository: InMemoryServantProductsRepository
  let sut: DeleteServantProductUseCase

  beforeEach(() => {
    inMemoryServantProductsRepository = new InMemoryServantProductsRepository()
    sut = new DeleteServantProductUseCase(inMemoryServantProductsRepository)
  })

  it('should be able to delete a existant servant', async () => {
    const servantProduct = makeServantProduct()
    await inMemoryServantProductsRepository.create(servantProduct)

    const result = await sut.execute({
      servantId: servantProduct.servantId,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantProductsRepository.items).toHaveLength(0)
  })
})
