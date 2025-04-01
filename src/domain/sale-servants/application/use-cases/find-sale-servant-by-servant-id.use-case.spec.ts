import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeSaleServant } from 'test/factories/sale-servants.factory'
import { InMemorySaleServantsRepository } from 'test/in-memories/in-memory-sale-servants.repository'
import { FindSaleServantByIdUseCase } from './find-sale-servant-by-servant-id.use-case'
import { makeSale } from 'test/factories/sales.factory'
import { makeServant } from 'test/factories/servants.factory'

describe('FindSaleServantByIdUseCase', () => {
  let inMemorySaleServantsRepository: InMemorySaleServantsRepository
  let sut: FindSaleServantByIdUseCase

  beforeEach(() => {
    inMemorySaleServantsRepository = new InMemorySaleServantsRepository()
    sut = new FindSaleServantByIdUseCase(inMemorySaleServantsRepository)
  })

  it('should be able to find a sale servant', async () => {
    const sale = makeSale()
    const servant = makeServant()

    const saleServant = await inMemorySaleServantsRepository.create(
      makeSaleServant({
        saleId: sale.id.toString(),
        servantId: servant.id.toString(),
      }),
    )

    const result = await sut.execute({
      servantId: saleServant.servantId,
      saleId: saleServant.saleId,
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

  it('should not be able find a non-existant sale servant', async () => {
    const result = await sut.execute({
      servantId: 'non-existant-id',
      saleId: 'non-existant-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
