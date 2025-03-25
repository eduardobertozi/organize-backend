import { InMemorySalesRepository } from 'test/in-memories/in-memory-sales.repository'
import { makeServant } from 'test/factories/servants.factory'
import { makeSale } from 'test/factories/sales.factory'
import { FindSaleByIdUseCase } from './find-sale-by-id.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('FindSaleByIdUseCase', () => {
  let inMemorySalesRepository: InMemorySalesRepository
  let sut: FindSaleByIdUseCase

  beforeEach(() => {
    inMemorySalesRepository = new InMemorySalesRepository()
    sut = new FindSaleByIdUseCase(inMemorySalesRepository)
  })

  it('should be able to find sales by id', async () => {
    const servant = makeServant({
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
    })

    const sale = await inMemorySalesRepository.create(
      makeSale({
        amount: servant.price,
        description: `Sale Example`,
      }),
    )

    const result = await sut.execute({
      saleId: sale.id.toString(),
    })

    expect(result.isRight()).toEqual(true)

    if ('sale' in result.value) {
      expect(result.value.sale).toEqual(
        expect.objectContaining({
          id: sale.id,
          description: 'Sale Example',
        }),
      )

      expect(inMemorySalesRepository.items).toHaveLength(1)
    }
  })

  it('should not be able to find non-exist sale by id', async () => {
    const result = await sut.execute({
      saleId: 'non-exist-sale-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(inMemorySalesRepository.items).toHaveLength(0)
  })
})
