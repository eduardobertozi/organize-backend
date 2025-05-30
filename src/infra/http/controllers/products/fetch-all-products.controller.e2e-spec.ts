import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentsFactory } from 'test/factories/attachments.factory'
import { ProductAttachmentFactory } from 'test/factories/product-attachments.factory'
import { ProductsFactory } from 'test/factories/products.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Fetch All Products (E2E)', () => {
  let app: INestApplication
  let usersFactory: UsersFactory
  let productsFactory: ProductsFactory
  let suppliersFactory: SuppliersFactory
  let attachmentsFactory: AttachmentsFactory
  let productAttachmentsFactory: ProductAttachmentFactory
  let jwt: JwtService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UsersFactory,
        ProductsFactory,
        SuppliersFactory,
        AttachmentsFactory,
        ProductAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    usersFactory = moduleRef.get(UsersFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    attachmentsFactory = moduleRef.get(AttachmentsFactory)
    productAttachmentsFactory = moduleRef.get(ProductAttachmentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /products/all', async () => {
    const user = await usersFactory.makePrismaUser()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const supplier = await suppliersFactory.makePrismaSuppliers()

    const product = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
      name: `Product 1`,
    })

    const attachment = await attachmentsFactory.makePrismaAttachment()

    await productAttachmentsFactory.makePrismaProductAttachment({
      productId: product.id,
      attachmentId: attachment.id,
    })

    const response = await request(app.getHttpServer())
      .get('/products/all?page=1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body.products).toBeTruthy()

    expect(response.body).toEqual(
      expect.objectContaining({
        total: 1,
        hasMore: false,
        nextPage: null,
        previousPage: null,
      }),
    )

    expect(response.body.products[0].attachments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: attachment.id.toString(),
          title: attachment.title,
          url: attachment.url,
        }),
      ]),
    )
  })
})
