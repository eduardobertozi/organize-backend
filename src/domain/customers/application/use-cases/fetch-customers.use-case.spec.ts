import { UniqueEntityID } from '@/core/unique-entity-id'
import { makeCustomer } from 'test/factories/customers.factory'
import { InMemoryCustomersRepository } from 'test/in-memories/in-memory-customers.repository'
import { FetchCustomersUseCase } from './fetch-customers.use-case'

describe('FetchCustomersUseCase', () => {
  let inMemoryCustomersRepository: InMemoryCustomersRepository
  let sut: FetchCustomersUseCase

  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    sut = new FetchCustomersUseCase(inMemoryCustomersRepository)
  })

  it('should be able to fetch all customers', async () => {
    for (let i = 0; i < 12; i++) {
      await inMemoryCustomersRepository.create(
        makeCustomer({
          userId: new UniqueEntityID(`user-${i}`),
        }),
      )
    }

    const result = await sut.execute({})

    if (result.isRight()) {
      expect(result.value?.customers).toHaveLength(12)
    }
  })

  it('should be able to fetch paginated customers with 10 items per page', async () => {
    for (let i = 0; i < 12; i++) {
      await inMemoryCustomersRepository.create(
        makeCustomer({
          userId: new UniqueEntityID(`user-${i}`),
        }),
      )
    }

    const result = await sut.execute({
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value?.customers).toHaveLength(10)
    }
  })

  it('should be able to fetch customers with search value', async () => {
    for (let i = 0; i < 12; i++) {
      await inMemoryCustomersRepository.create(
        makeCustomer({
          name: `Customer ${i}`,
          userId: new UniqueEntityID(`user-${i}`),
        }),
      )
    }

    const result = await sut.execute({
      q: 'Customer 0',
    })

    if (result.isRight()) {
      expect(result.value?.customers).toHaveLength(1)
      expect(result.value?.customers[0].name).toBe('Customer 0')
    }
  })
})
