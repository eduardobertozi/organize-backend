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
  let productsFactory: ProductsFactory
  let suppliersFactory: SuppliersFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, ProductsFactory, SuppliersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /servants', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const supplier = await suppliersFactory.makePrismaSuppliers()
    const product = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })

    const response = await request(app.getHttpServer())
      .post('/servants')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Servant',
        productsPrice: product.price,
        productsIds: [product.id.toString()],
        workForcePrice: 20,
        profitPercent: 100,
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
      include: {
        products: true,
      },
    })

    expect(servantsOnDatabase).toBeTruthy()
    expect(servantsOnDatabase?.products).toHaveLength(1)
  })
})
