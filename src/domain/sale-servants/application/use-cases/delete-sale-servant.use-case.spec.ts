import { InMemorySalesRepository } from 'test/in-memories/in-memory-sales.repository'
import { DeleteSaleServantUseCase } from './delete-sale-servant.use-case'
import { makeServant } from 'test/factories/servants.factory'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { InMemorySaleServantsRepository } from 'test/in-memories/in-memory-sale-servants.repository'
import { makeSale } from 'test/factories/sales.factory'
import { makeSaleServant } from 'test/factories/sale-servants.factory'

describe('DeleteSaleServantUseCase', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let inMemorySalesRepository: InMemorySalesRepository
  let inMemorySaleServantsRepository: InMemorySaleServantsRepository
  let sut: DeleteSaleServantUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    inMemorySalesRepository = new InMemorySalesRepository()
    inMemorySaleServantsRepository = new InMemorySaleServantsRepository()
    sut = new DeleteSaleServantUseCase(inMemorySaleServantsRepository)
  })

  it('should be able to delete a sale servant', async () => {
    const servant = await inMemoryServantsRepository.create(
      makeServant({
        productsPrice: 2,
        profitPercent: 48,
        workForcePrice: 25,
      }),
    )

    const sale = await inMemorySalesRepository.create(
      makeSale({
        amount: servant.price,
        description: 'New Sale Servant',
      }),
    )

    const saleServant = await inMemorySaleServantsRepository.create(
      makeSaleServant({
        saleId: sale.id.toString(),
        servantId: servant.id.toString(),
      }),
    )

    expect(inMemorySaleServantsRepository.items).toHaveLength(1)

    const result = await sut.execute({
      servantId: saleServant.servantId,
      saleId: saleServant.saleId,
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemorySaleServantsRepository.items).toHaveLength(0)
  })

  it('should not be able delete a sale servant that does not exist', async () => {
    const result = await sut.execute({
      servantId: 'invalid-id',
      saleId: 'invalid-id',
    })

    expect(result.isLeft()).toEqual(true)
  })
})
