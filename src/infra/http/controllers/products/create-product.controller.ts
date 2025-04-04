import { CreateProductUseCase } from '@/domain/products/application/use-cases/create-product.use-case'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import {
  CreateProductDto,
  CreateProductValidationPipe,
} from '../../dto/create-product.dto'

@Controller()
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('products')
  async handle(@Body(CreateProductValidationPipe) body: CreateProductDto) {
    const result = await this.createProductUseCase.execute({
      ...body,
      attachmentsIds: body.attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
