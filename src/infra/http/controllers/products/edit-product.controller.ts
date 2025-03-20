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
  EditProductDTO,
  EditProductValidationPipe,
} from '../../dto/edit-product.dto'

@Controller()
export class EditProductController {
  constructor(private readonly editProductUseCase: EditProductUseCase) {}

  @Put('/products/:productId')
  @HttpCode(204)
  async handle(
    @Param('productId') productId: string,
    @Body(EditProductValidationPipe) body: EditProductDTO,
  ) {
    const result = await this.editProductUseCase.execute({
      ...body,
      productId,
      attachmentsIds: body.attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
