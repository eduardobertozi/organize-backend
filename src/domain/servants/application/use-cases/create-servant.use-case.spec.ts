import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { CreateServantUseCase } from './create-servant.use-case'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'
import { makeProduct } from 'test/factories/products.factory'
import { makeSupplier } from 'test/factories/suppliers.factory'
import { Supplier } from '@/domain/suppliers/enterprise/entities/supplier'
import { Product } from '@/domain/products/enterprise/entities/product'

describe('Create Servant', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: CreateServantUseCase
  let supplier: Supplier
  let products: Product[]
  let productsPrice: number

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new CreateServantUseCase(inMemoryServantsRepository)

    supplier = makeSupplier()
    products = Array.from({ length: 2 }, (_, i) =>
      makeProduct({
        name: `Sample product ${i}`,
        price: 2,
        reference: `Sample reference ${i}`,
        supplierId: supplier.id,
      }),
    )
    productsPrice = products.reduce((acc, product) => acc + product.price, 0)
  })

  it('should be able to create a new servant', async () => {
    const result = await sut.execute({
      name: 'Sample servant',
      productsPrice,
      profitPercent: 48,
      workForcePrice: 25,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items).toHaveLength(1)
    expect(inMemoryServantsRepository.items[0].name).toBe('Sample servant')
    expect(inMemoryServantsRepository.items[0].price).toBe(43)
  })

  it('should not be able create a servant with this already exists', async () => {
    await inMemoryServantsRepository.create(
      makeServant({
        name: 'Sample servant',
      }),
    )

    const result = await sut.execute({
      name: 'Sample servant',
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
