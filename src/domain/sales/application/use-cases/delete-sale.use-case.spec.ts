import { InMemorySalesRepository } from 'test/in-memories/in-memory-sales.repository'
import { DeleteSaleUseCase } from './delete-sale.use-case'
import { makeServant } from 'test/factories/servants.factory'
import { makeSale } from 'test/factories/sales.factory'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('DeleteSaleUseCase', () => {
  let inMemorySalesRepository: InMemorySalesRepository
  let sut: DeleteSaleUseCase

  beforeEach(() => {
    inMemorySalesRepository = new InMemorySalesRepository()
    sut = new DeleteSaleUseCase(inMemorySalesRepository)
  })

  it('should be able to delete a sale', async () => {
    const servant = makeServant({
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
    })

    const sale = await inMemorySalesRepository.create(
      makeSale({
        amount: servant.price,
      }),
    )

    const result = await sut.execute({
      saleId: sale.id.toString(),
    })

    expect(result.isRight()).toEqual(true)

    expect(inMemorySalesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existant sale', async () => {
    const result = await sut.execute({
      saleId: 'non-existand-sale-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
