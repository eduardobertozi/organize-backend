import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ProductsFactory } from 'test/factories/products.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Fetch All Products (E2E)', () => {
  let app: INestApplication
  let usersFactory: UsersFactory
  let productsFactory: ProductsFactory
  let suppliersFactory: SuppliersFactory
  let jwt: JwtService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, ProductsFactory, SuppliersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    usersFactory = moduleRef.get(UsersFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /products/all', async () => {
    const user = await usersFactory.makePrismaUser()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const supplier = await suppliersFactory.makePrismaSuppliers()

    await Promise.all(
      Array.from({ length: 12 }).map((_v, i) =>
        productsFactory.makePrismaProducts({
          supplierId: supplier.id,
          name: `Product ${i}`,
        }),
      ),
    )

    const response = await request(app.getHttpServer())
      .get('/products/all?page=1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body.products).toBeTruthy()

    expect(response.body).toEqual(
      expect.objectContaining({
        total: 12,
        hasMore: true,
        nextPage: 2,
        previousPage: null,
      }),
    )
    expect(response.body.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachments: expect.any(Array),
        }),
      ]),
    )
  })
})
