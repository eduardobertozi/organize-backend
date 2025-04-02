import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ProductsFactory } from 'test/factories/products.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Create Servant (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let suppliersFactory: SuppliersFactory
  let productsFactory: ProductsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, ProductsFactory, SuppliersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /servants', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const supplier = await suppliersFactory.makePrismaSuppliers()

    const product1 = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })
    const product2 = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })

    const response = await request(app.getHttpServer())
      .post('/servants')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Servant',
        productsPrice: 50,
        workForcePrice: 20,
        profitPercent: 48,
        products: [product1.id.toString(), product2.id.toString()],
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        servant: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    )

    const servant = response.body.servant

    const servantsOnDatabase = await prisma.servant.findFirst({
      where: {
        id: servant.id,
      },
    })

    expect(servantsOnDatabase).toBeTruthy()

    const servantProductsOnDatabase = await prisma.servantProducts.findMany({
      where: {
        servantId: servant.id,
      },
    })

    expect(servantProductsOnDatabase).toBeTruthy()
  })
})
