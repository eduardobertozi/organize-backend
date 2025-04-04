import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentsFactory } from 'test/factories/attachments.factory'
import { ProductsFactory } from 'test/factories/products.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Create Product (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let attachmentsFactory: AttachmentsFactory
  let suppliersFactory: SuppliersFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UsersFactory,
        ProductsFactory,
        AttachmentsFactory,
        SuppliersFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    attachmentsFactory = moduleRef.get(AttachmentsFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /products', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const attachment1 = await attachmentsFactory.makePrismaAttachment()
    const attachment2 = await attachmentsFactory.makePrismaAttachment()

    const supplier = await suppliersFactory.makePrismaSuppliers()
    const supplierId = supplier.id.toString()

    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Product',
        price: 100,
        reference: '123456',
        supplierId,
        stock: 1,
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

    expect(response.statusCode).toBe(201)

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
  })
})
