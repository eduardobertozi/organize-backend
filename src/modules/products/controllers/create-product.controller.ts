import { ZodValidationPipe } from '@/infrastructure/pipes/zod-validation.pipe'
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
} from '../dtos/create-product.dto'
import { CreateProductUseCase } from '../use-cases/create-product.use-case'

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
