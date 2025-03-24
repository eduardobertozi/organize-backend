import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { UsersFactory } from 'test/factories/users.factory'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create Supplier (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /suppliers', async () => {
    const user = await usersFactory.makePrismaUser()

    const access_token = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/suppliers')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Supplier',
        phone: '11999999999',
        email: 'supplier@example.com',
        address: 'Rua dos Bobos, 0',
        city: 'São Paulo',
        state: 'SP',
      })

    expect(response.statusCode).toBe(201)

    const suppliersOnDatabase = await prisma.supplier.findFirst({
      where: {
        name: 'New Supplier',
      },
    })

    expect(suppliersOnDatabase).toBeTruthy()
  })
})
