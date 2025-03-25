import { CreateServantProductUseCase } from '@/domain/servant-products/application/use-cases/create-servant-product.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  CreateServantProductDTO,
  CreateServantProductValidationPipe,
} from '../../dto/create-servant-product.dto'

@Controller()
export class CreateServantProductController {
  constructor(
    private readonly createServantProductUseCase: CreateServantProductUseCase,
  ) {}

  @Post('servant-products')
  @UsePipes(CreateServantProductValidationPipe)
  async handle(@Body() body: CreateServantProductDTO) {
    const result = await this.createServantProductUseCase.execute(body)

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
