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

describe('Edit Servant (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let servantsFactory: ServantsFactory
  let productsFactory: ProductsFactory
  let suppliersFactory: SuppliersFactory
  let servantProductsFactory: ServantProductsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UsersFactory,
        ServantsFactory,
        ProductsFactory,
        SuppliersFactory,
        ServantProductsFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    servantsFactory = moduleRef.get(ServantsFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    servantProductsFactory = moduleRef.get(ServantProductsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /servants/:servantId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const supplier = await suppliersFactory.makePrismaSuppliers()

    const product1 = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })
    const product2 = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })

    const servant = await servantsFactory.makePrismaServant()

    await servantProductsFactory.makePrismaServantProduct({
      productId: product1.id,
      servantId: servant.id,
    })

    await servantProductsFactory.makePrismaServantProduct({
      productId: product2.id,
      servantId: servant.id,
    })

    const product3 = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })

    const response = await request(app.getHttpServer())
      .put(`/servants/${servant.id.toString()}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Servant Name',
        productsPrice: servant.productsPrice,
        workForcePrice: servant.workForcePrice,
        profitPercent: servant.productsPrice,
        products: [product1.id.toString(), product3.id.toString()],
      })

    expect(response.statusCode).toBe(200)

    const servantsOnDatabase = await prisma.servant.findFirst({
      where: {
        name: 'New Servant Name',
      },
    })

    expect(servantsOnDatabase).toBeTruthy()

    const servantProductsOnDatabase = await prisma.servantProducts.findMany({
      where: {
        servantId: servantsOnDatabase?.id,
      },
    })

    expect(servantProductsOnDatabase).toHaveLength(2)

    const product1OnDatabase = await prisma.product.findFirst({
      where: { name: product1.name },
    })

    expect(servantProductsOnDatabase).toHaveLength(2)

    expect(servantProductsOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: product1OnDatabase?.id,
          servantId: servantsOnDatabase?.id,
        }),
      ]),
    )
  })
})
