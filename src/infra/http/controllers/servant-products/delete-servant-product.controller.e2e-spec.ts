import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ProductsFactory } from 'test/factories/products.factory'
import { ServantProductsFactory } from 'test/factories/servant-product.factory'
import { ServantsFactory } from 'test/factories/servants.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Delete Servant Product (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let suppliersFactory: SuppliersFactory
  let productsFactory: ProductsFactory
  let servantsFactory: ServantsFactory
  let servantProductFactory: ServantProductsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        PrismaService,
        UsersFactory,
        SuppliersFactory,
        ProductsFactory,
        ServantsFactory,
        SuppliersFactory,
        ServantProductsFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    servantsFactory = moduleRef.get(ServantsFactory)
    servantProductFactory = moduleRef.get(ServantProductsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /servant-products/:servantId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const supplier = await suppliersFactory.makePrismaSuppliers()
    const product = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })
    const servant = await servantsFactory.makePrismaServant()

    await servantProductFactory.makePrismaServantProduct({
      productId: product.id.toString(),
      servantId: servant.id.toString(),
    })

    const response = await request(app.getHttpServer())
      .delete(`/servant-products/${servant.id.toString()}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response.statusCode).toBe(204)

    const servantProductOnDatabase = await prisma.servantProducts.findUnique({
      where: {
        servantId_productId: {
          servantId: servant.id.toString(),
          productId: product.id.toString(),
        },
      },
    })

    expect(servantProductOnDatabase).toBeNull()
  })
})
