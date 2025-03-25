import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'
import { makeServant } from 'test/factories/servants.factory'
import { FindServantProductsByServantIdUseCase } from './find-servant-products-by-servant-id.use-case'
import { ServantProduct } from '../../entreprise/entities/servant-product'
import { makeProduct } from 'test/factories/products.factory'

describe('Fetch All Servant Products', () => {
  let inMemoryServantProductsRepository: InMemoryServantProductsRepository
  let sut: FindServantProductsByServantIdUseCase

  beforeEach(() => {
    inMemoryServantProductsRepository = new InMemoryServantProductsRepository()
    sut = new FindServantProductsByServantIdUseCase(
      inMemoryServantProductsRepository,
    )
  })

  it('should be able to fetch all servant products', async () => {
    const servant = makeServant()
    const product = makeProduct()

    const servantProduct = ServantProduct.create({
      productId: product.id.toString(),
      servantId: servant.id.toString(),
    })

    await inMemoryServantProductsRepository.create(servantProduct)

    const result = await sut.execute({
      servantId: servant.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantProductsRepository.items).toHaveLength(1)
  })

  it('should not be able to fetch not existant servant products', async () => {
    const result = await sut.execute({
      servantId: 'servant-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryServantProductsRepository.items).toHaveLength(0)
  })
})
