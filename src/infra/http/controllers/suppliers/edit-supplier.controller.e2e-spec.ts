import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { UsersFactory } from 'test/factories/users.factory'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { SuppliersFactory } from 'test/factories/suppliers.factory'

describe('Edit Supplier (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let suppliersFactory: SuppliersFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, SuppliersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /suppliers/:suppliersId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })
    const supplier = await suppliersFactory.makePrismaSuppliers()

    const response = await request(app.getHttpServer())
      .put(`/suppliers/${supplier.id.toString()}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Supplier Name',
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address,
        city: supplier.city,
        state: supplier.state,
      })

    expect(response.statusCode).toBe(204)

    const suppliersOnDatabase = await prisma.supplier.findUnique({
      where: {
        id: supplier.id.toString(),
      },
    })

    expect(suppliersOnDatabase).toBeTruthy()
    expect(suppliersOnDatabase?.name).toBe('New Supplier Name')
  })
})
