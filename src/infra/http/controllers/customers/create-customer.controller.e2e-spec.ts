import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UsersFactory } from 'test/factories/users.factory'

describe('Create Customer (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)

    await app.init()
  })

  test('[POST] /customers', async () => {
    const user = await usersFactory.makePrismaUser({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
    })

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'John Doe',
        phone: '(11) 91234-5678',
        email: 'johndoe@example.com',
        address: '123 Main St',
        city: 'São Paulo',
        state: 'SP',
        userId: user.id.toString(),
      })

    expect(response.statusCode).toBe(201)

    const customerOnDatabase = await prisma.user.findFirst({
      where: {
        name: 'John Doe',
      },
    })

    expect(customerOnDatabase).toBeTruthy()
  })
})
