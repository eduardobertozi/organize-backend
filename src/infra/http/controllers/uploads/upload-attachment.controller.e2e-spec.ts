import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { StorageModule } from '@/infra/storage/storage.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UsersFactory } from 'test/factories/users.factory'

describe('Upload Attachment [E2E]', () => {
  let app: INestApplication
  let userFactory: UsersFactory
  let jwt: JwtService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, StorageModule],
      providers: [UsersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UsersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /attachments', async () => {
    const user = await userFactory.makePrismaUser()

    const access_token = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${access_token}`)
      .attach('file', './test/fixtures/sample.jpg')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      attachmentId: expect.any(String),
    })
  })
})
