import { AppModule } from '@/app.module'
import { PrismaService } from '@/infrastructure/database/prisma.service'
import { AttachmentsFactory } from '@/modules/attachments/test/attachments-factory'
import { UsersFactory } from '@/modules/user/test/users.factory'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseProductsModule } from '../database/database-products.module'
import { ProductsFactory } from '../test/products.factory'

describe('Answer Question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let attachmentsFactory: AttachmentsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseProductsModule],
      providers: [UsersFactory, ProductsFactory, AttachmentsFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    attachmentsFactory = moduleRef.get(AttachmentsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /products', async () => {
    const user = await usersFactory.makePrismaUser()

    const access_token = jwt.sign({ sub: user.id.toString() })

    const attachment1 = await attachmentsFactory.makePrismaAttachment()
    const attachment2 = await attachmentsFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Product',
        price: 100,
        reference: '123456',
        supplierId: 'supplier-1',
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
