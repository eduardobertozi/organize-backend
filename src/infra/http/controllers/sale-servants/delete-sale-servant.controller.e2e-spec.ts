import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SaleServantsFactory } from 'test/factories/sale-servants.factory'
import { SalesFactory } from 'test/factories/sales.factory'
import { ServantsFactory } from 'test/factories/servants.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Delete Sale Servant (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let servantsFactory: ServantsFactory
  let salesFactory: SalesFactory
  let saleServantsFactory: SaleServantsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UsersFactory,
        ServantsFactory,
        SalesFactory,
        SaleServantsFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    servantsFactory = moduleRef.get(ServantsFactory)
    salesFactory = moduleRef.get(SalesFactory)
    saleServantsFactory = moduleRef.get(SaleServantsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /sale-servants/:saleServantId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const servant = await servantsFactory.makePrismaServant()
    const sale = await salesFactory.makePrismaSale()

    const saleServant = await saleServantsFactory.makePrismaSaleServant({
      saleId: sale.id.toString(),
      servantId: servant.id.toString(),
    })

    const response = await request(app.getHttpServer())
      .delete(`/sale-servants/${saleServant.id.toString()}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response.statusCode).toBe(204)

    const saleServantsOnDatabase = await prisma.saleServants.findFirst({
      where: {
        saleId: sale.id.toString(),
      },
    })

    expect(saleServantsOnDatabase).toBeNull()
  })
})
