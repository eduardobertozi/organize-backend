import { InMemorySalesRepository } from 'test/in-memories/in-memory-sales.repository'
import { makeServant } from 'test/factories/servants.factory'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { EditSaleUseCase } from './edit-sale.use-case'
import { makeSale } from 'test/factories/sales.factory'
import { InMemorySaleServantsRepository } from 'test/in-memories/in-memory-sale-servants.repository'

describe('EditSaleUseCase', () => {
  let inMemorySaleServantsRepository: InMemorySaleServantsRepository
  let inMemorySalesRepository: InMemorySalesRepository
  let sut: EditSaleUseCase

  beforeEach(() => {
    inMemorySaleServantsRepository = new InMemorySaleServantsRepository()
    inMemorySalesRepository = new InMemorySalesRepository(
      inMemorySaleServantsRepository,
    )

    sut = new EditSaleUseCase(
      inMemorySalesRepository,
      inMemorySaleServantsRepository,
    )
  })

  it('should be able to edit a sale', async () => {
    const servant = makeServant({
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
    })

    const sale = makeSale({
      amount: servant.price,
    })

    await inMemorySalesRepository.create(sale)

    const result = await sut.execute({
      saleId: sale.id.toString(),
      description: 'New Sale',
      amount: servant.price,
      servantsIds: [servant.id.toString()],
    })

    expect(result.isRight()).toEqual(true)

    if ('sale' in result.value) {
      expect(result.value.sale).toEqual(
        expect.objectContaining({
          description: 'New Sale',
          amount: 40,
        }),
      )
    }
  })

  it('should not be able edit a non-existant sale', async () => {
    const result = await sut.execute({
      saleId: 'sale-id',
      description: 'New Sale',
      amount: 40,
      servantsIds: [],
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
