import { InMemorySalesRepository } from 'test/in-memories/in-memory-sales.repository'
import { makeServant } from 'test/factories/servants.factory'
import { makeSale } from 'test/factories/sales.factory'
import { FetchAllSalesUseCase } from './fetch-all-sales.use-case'
import { InMemorySaleServantsRepository } from 'test/in-memories/in-memory-sale-servants.repository'

describe('FetchAllSalesUseCase', () => {
  let inMemorySaleServantsRepository: InMemorySaleServantsRepository
  let inMemorySalesRepository: InMemorySalesRepository
  let sut: FetchAllSalesUseCase

  beforeEach(() => {
    inMemorySaleServantsRepository = new InMemorySaleServantsRepository()
    inMemorySalesRepository = new InMemorySalesRepository(
      inMemorySaleServantsRepository,
    )
    sut = new FetchAllSalesUseCase(inMemorySalesRepository)
  })

  it('should be able to fetch all sales', async () => {
    const servant = makeServant({
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
    })

    await Promise.all(
      Array.from({ length: 12 }, (_, index) =>
        inMemorySalesRepository.create(
          makeSale({
            amount: servant.price,
            description: `Sale ${index + 1}`,
          }),
        ),
      ),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemorySalesRepository.items).toHaveLength(12)
    expect(result.value!.sales).toHaveLength(10)

    const result2 = await sut.execute({
      page: 2,
    })

    expect(result2.value!.sales).toHaveLength(2)
  })
})
