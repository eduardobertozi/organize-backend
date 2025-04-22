import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  CustomersRepository,
  FindManyCustomersResponse,
} from '@/domain/customers/application/repositories/customers.repository'
import { Customer } from '@/domain/customers/enterprise/entities/customer.entity'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaCustomerMapper } from '../mappers/prisma-customers.mapper'

@Injectable()
export class PrismaCustomersService implements CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    page,
    q,
  }: PaginationParams): Promise<FindManyCustomersResponse> {
    const query = {}

    if (q) {
      query['where'] = {
        name: {
          contains: q,
        },
      }
    }

    if (page) {
      query['take'] = 10
      query['skip'] = (page - 1) * 10
    }

    const customers = await this.prisma.user.findMany(query)

    const total = await this.prisma.user.count({
      where: {
        name: {
          contains: q,
        },
      },
    })

    return {
      total: total,
      customers: customers.map((customer) =>
        PrismaCustomerMapper.toDomain(customer),
      ),
    }
  }

  async findById(id: UniqueEntityID): Promise<Customer | null> {
    const customer = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(customer)
  }

  async findByUserId(userId: UniqueEntityID): Promise<Customer | null> {
    const customer = await this.prisma.user.findUnique({
      where: { id: userId.toString() },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(customer)
  }

  async create(customer: Customer): Promise<Customer> {
    await this.prisma.user.update({
      where: {
        id: customer.userId!.toString(),
      },
      data: PrismaCustomerMapper.toPrisma(customer),
    })

    return customer
  }

  async save(customer: Customer): Promise<Customer> {
    await this.prisma.user.update({
      where: {
        id: customer.userId!.toString(),
      },
      data: PrismaCustomerMapper.toPrisma(customer),
    })

    return customer
  }

  async delete(customer: Customer): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: customer.userId!.toString(),
      },
    })
  }
}
