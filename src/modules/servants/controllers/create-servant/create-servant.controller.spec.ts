import { Test, TestingModule } from '@nestjs/testing'
import { CreateServantController } from './create-servant.controller'

describe('CreateServantController', () => {
  let controller: CreateServantController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateServantController],
    }).compile()

    controller = module.get<CreateServantController>(CreateServantController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
