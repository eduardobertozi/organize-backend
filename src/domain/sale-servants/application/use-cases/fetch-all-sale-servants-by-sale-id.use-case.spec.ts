import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeSaleServant } from 'test/factories/sale-servants.factory'
import { InMemorySaleServantsRepository } from 'test/in-memories/in-memory-sale-servants.repository'
import { FetchAllSaleServantsBySaleIdUseCase } from './fetch-all-sale-servants-by-sale-id.use-case'
import { makeSale } from 'test/factories/sales.factory'
import { makeServant } from 'test/factories/servants.factory'

describe('FindSaleServantBySaleIdUseCase', () => {
  let inMemorySaleServantsRepository: InMemorySaleServantsRepository
  let sut: FetchAllSaleServantsBySaleIdUseCase

  beforeEach(() => {
    inMemorySaleServantsRepository = new InMemorySaleServantsRepository()
    sut = new FetchAllSaleServantsBySaleIdUseCase(
      inMemorySaleServantsRepository,
    )
  })

  it('should be able to create a sale servant', async () => {
    const sale = makeSale()
    const servant = makeServant()

    await inMemorySaleServantsRepository.create(
      makeSaleServant({
        saleId: sale.id.toString(),
        servantId: servant.id.toString(),
      }),
    )
    await inMemorySaleServantsRepository.create(
      makeSaleServant({ saleId: sale.id.toString() }),
    )

    const result = await sut.execute({
      saleId: sale.id.toString(),
    })

    expect(result.isRight()).toEqual(true)

    if ('saleServants' in result.value) {
      expect(result.value.saleServants).toHaveLength(2)
      expect(result.value.saleServants).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            saleId: sale.id.toString(),
            servantId: servant.id.toString(),
          }),
        ]),
      )
    }
  })

  it('should not be able find a non-existant sale servant', async () => {
    const result = await sut.execute({
      saleId: 'non-existant-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
