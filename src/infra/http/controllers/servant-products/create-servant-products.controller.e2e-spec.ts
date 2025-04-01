import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ProductsFactory } from 'test/factories/products.factory'
import { ServantsFactory } from 'test/factories/servants.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Create Servant (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let productsFactory: ProductsFactory
  let servantsFactory: ServantsFactory
  let suppliersFactory: SuppliersFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UsersFactory,
        ProductsFactory,
        ServantsFactory,
        SuppliersFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    servantsFactory = moduleRef.get(ServantsFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /servant-products', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const supplier = await suppliersFactory.makePrismaSuppliers()
    const product = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })
    const servant = await servantsFactory.makePrismaServant()

    const response = await request(app.getHttpServer())
      .post('/servant-products')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        servantId: servant.id.toString(),
        productId: product.id.toString(),
      })

    expect(response.statusCode).toBe(201)

    const servantProductsOnDatabase = await prisma.servantProducts.findUnique({
      where: {
        servantId_productId: {
          servantId: servant.id.toString(),
          productId: product.id.toString(),
        },
      },
    })

    expect(servantProductsOnDatabase).toBeTruthy()
  })
})
