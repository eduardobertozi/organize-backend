import { EditProductUseCase } from '@/domain/products/application/use-cases/edit-product.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'

import {
  CreateProductDto,
  CreateProductValidationPipe,
} from '../../dto/create-product.dto'
import { ProductPresenter } from '../../presenters/http-products.presenter'

@Controller()
export class EditProductController {
  constructor(private readonly editProductUseCase: EditProductUseCase) {}

  @Put('/products/:productId')
  @HttpCode(204)
  async handle(
    @Param('productId') productId: string,
    @Body(CreateProductValidationPipe) body: CreateProductDto,
  ) {
    const result = await this.editProductUseCase.execute({
      ...body,
      productId,
      attachmentsIds: body.attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    return {
      message: 'Produto atualizado com sucesso!',
      product: ProductPresenter.toHTTP(result.value.product),
    }
  }
}
