import { CreateProductUseCase } from '@/domain/products/application/use-cases/create-product.use-case'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  CreateProductDto,
  CreateProductSchema,
} from '../../dto/create-product.dto'

@Controller()
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('products')
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  async handle(@Body() body: CreateProductDto) {
    const result = await this.createProductUseCase.execute({
      ...body,
      attachmentsIds: body.attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
