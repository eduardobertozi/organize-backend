import { InMemorySalesRepository } from 'test/in-memories/in-memory-sales.repository'
import { CreateSaleUseCase } from './create-sale.use-case'
import { makeServant } from 'test/factories/servants.factory'
import { InMemorySaleServantsRepository } from 'test/in-memories/in-memory-sale-servants.repository'

describe('CreateSaleUseCase', () => {
  let inMemorySaleServantsRepository: InMemorySaleServantsRepository
  let inMemorySalesRepository: InMemorySalesRepository
  let sut: CreateSaleUseCase

  beforeEach(() => {
    inMemorySaleServantsRepository = new InMemorySaleServantsRepository()
    inMemorySalesRepository = new InMemorySalesRepository(
      inMemorySaleServantsRepository,
    )
    sut = new CreateSaleUseCase(inMemorySalesRepository)
  })

  it('should be able to create a sale', async () => {
    const servant = makeServant({
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
    })

    const servant2 = makeServant({
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
    })

    const result = await sut.execute({
      description: 'New Sale',
      amount: servant.price + servant2.price,
      servantsIds: [servant.id.toString(), servant2.id.toString()],
    })

    expect(result.isRight()).toEqual(true)

    if ('sale' in result.value) {
      expect(result.value.sale.amount).toBe(80)
      expect(result.value.sale.servants.getItems()).toHaveLength(2)
    }
  })
})
