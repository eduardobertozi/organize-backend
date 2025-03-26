import { InMemorySalesRepository } from 'test/in-memories/in-memory-sales.repository'
import { CreateSaleServantUseCase } from './create-sale-servant.use-case'
import { makeServant } from 'test/factories/servants.factory'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { InMemorySaleServantsRepository } from 'test/in-memories/in-memory-sale-servants.repository'
import { makeSale } from 'test/factories/sales.factory'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('CreateSaleServantUseCase', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let inMemorySalesRepository: InMemorySalesRepository
  let inMemorySaleServantsRepository: InMemorySaleServantsRepository
  let sut: CreateSaleServantUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    inMemorySalesRepository = new InMemorySalesRepository()
    inMemorySaleServantsRepository = new InMemorySaleServantsRepository()
    sut = new CreateSaleServantUseCase(
      inMemoryServantsRepository,
      inMemorySalesRepository,
      inMemorySaleServantsRepository,
    )
  })

  it('should be able to create a sale servant', async () => {
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

    const result = await sut.execute({
      saleId: sale.id.toString(),
      servantId: servant.id.toString(),
    })

    expect(result.isRight()).toEqual(true)

    if ('saleServant' in result.value) {
      expect(result.value.saleServant).toEqual(
        expect.objectContaining({
          saleId: sale.id.toString(),
          servantId: servant.id.toString(),
        }),
      )
    }
  })

  it('should not be able create a sale servant with invalid sale or servant id', async () => {
    const result = await sut.execute({
      saleId: 'invalid_id',
      servantId: 'invalid_id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
