import { CreateProductUseCase } from '@/domain/products/application/use-cases/create-product.use-case'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import {
  CreateProductDto,
  CreateProductValidationPipe,
} from '../../dto/create-product.dto'
import { ProductPresenter } from '../../presenters/http-products.presenter'

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
      throw new BadRequestException(result.value.message)
    }

    return {
      message: 'Produto criado com sucesso!',
      product: ProductPresenter.toHTTP(result.value.product),
    }
  }
}
