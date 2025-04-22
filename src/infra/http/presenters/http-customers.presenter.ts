import { Customer } from '@/domain/customers/enterprise/entities/customer.entity'

export class CustomerPresenter {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id.toString(),
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      userId: customer.userId,
    }
  }
}
