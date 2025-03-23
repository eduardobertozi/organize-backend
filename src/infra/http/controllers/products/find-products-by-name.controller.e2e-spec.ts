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

describe('Find Products By Name (E2E)', () => {
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

  test('[GET] /products/?name=&page=', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    /* Create a supplier */
    const supplier = await suppliersFactory.makePrismaSuppliers()

    /* Create a product related by supplier */
    await Promise.all(
      Array.from({ length: 12 }).map((_v, i) =>
        productsFactory.makePrismaProducts({
          supplierId: supplier.id,
          name: `Product ${i}`,
        }),
      ),
    )

    const response = await request(app.getHttpServer())
      .get('/products?name=Product&page=1')
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response.statusCode).toBe(200)

    const productsOnDatabase = await prisma.product.findMany({
      where: {
        name: {
          contains: 'Product',
        },
      },
      take: 10,
      skip: (1 - 1) * 10,
    })

    expect(productsOnDatabase).toBeTruthy()
    expect(productsOnDatabase.length).toBe(10)

    const productsOnDatabase2 = await prisma.product.findMany({
      where: {
        name: {
          contains: 'Product',
        },
      },
      take: 10,
      skip: (2 - 1) * 10,
    })

    expect(productsOnDatabase2.length).toBe(2)
  })
})
