import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentsFactory } from 'test/factories/attachments.factory'
import { ProductAttachmentFactory } from 'test/factories/product-attachments.factory'
import { ProductsFactory } from 'test/factories/products.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Edit Product (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let productsFactory: ProductsFactory
  let attachmentsFactory: AttachmentsFactory
  let productAttachmentsFactory: ProductAttachmentFactory
  let suppliersFactory: SuppliersFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UsersFactory,
        ProductsFactory,
        AttachmentsFactory,
        ProductAttachmentFactory,
        SuppliersFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    productsFactory = moduleRef.get(ProductsFactory)
    attachmentsFactory = moduleRef.get(AttachmentsFactory)
    productAttachmentsFactory = moduleRef.get(ProductAttachmentFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /products/:supplierId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    /* Create two attachments */
    const attachment1 = await attachmentsFactory.makePrismaAttachment()
    const attachment2 = await attachmentsFactory.makePrismaAttachment()

    /* Create a supplier */
    const supplier = await suppliersFactory.makePrismaSuppliers()
    const supplierId = supplier.id.toString()

    /* Create a product related by supplier */
    const product = await productsFactory.makePrismaProducts({
      supplierId: supplier.id,
    })
    const productId = product.id.toString()

    /* add created attachments to product */
    await productAttachmentsFactory.makePrismaProductAttachment({
      attachmentId: attachment1.id,
      productId: product.id,
    })

    await productAttachmentsFactory.makePrismaProductAttachment({
      attachmentId: attachment2.id,
      productId: product.id,
    })

    /* create new attachment to edit */
    const attachment3 = await attachmentsFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Product',
        price: 100,
        reference: '123456',
        supplierId,
        stock: 1,
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      })

    expect(response.statusCode).toBe(204)

    const productsOnDatabase = await prisma.product.findFirst({
      where: {
        name: 'New Product',
      },
    })

    expect(productsOnDatabase).toBeTruthy()

    const attachmentsOnDatabase = await prisma.attachment.findMany({
      where: {
        productId: productsOnDatabase?.id,
      },
    })

    expect(attachmentsOnDatabase).toHaveLength(2)
    expect(attachmentsOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: attachment1.id.toString() }),
        expect.objectContaining({ id: attachment3.id.toString() }),
      ]),
    )
  })
})
