import { InMemoryCustomersRepository } from 'test/in-memories/in-memory-customers.repository'
import { CreateCustomerUseCase } from './create-customer.use-case'
import { UniqueEntityID } from '@/core/unique-entity-id'

describe('CreateCustomerUseCase', () => {
  let inMemoryCustomersRepository: InMemoryCustomersRepository
  let sut: CreateCustomerUseCase

  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(inMemoryCustomersRepository)
  })

  it('should be able to create a new customer', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      phone: '123456789',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      userId: new UniqueEntityID('user-123'),
    })

    if (result.isRight()) {
      expect(result.value.customer).toBeDefined()
      expect(result.value.customer.name).toBe('John Doe')
    }
  })
})
