import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentType } from './errors/invalid-attachment-type'
import { Attachment } from '../attachments/enterprise/entities/attachment'
import { AttachmentsRepository } from '../attachments/application/repositories/attachments.repository'
import { UploaderGateway } from '@/infra/gateways/storage/uploader'

interface UploadAndCreateAttachmentRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentType,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private readonly attachmentsRepository: AttachmentsRepository,
    private uploader: UploaderGateway,
  ) {}

  async execute({
    fileName,
    fileType,
  }: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    const validFileType = /^(image\/(jpeg|png))$|^application\/pdf$/.test(
      fileType,
    )

    if (!validFileType) {
      return left(new InvalidAttachmentType(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body: Buffer.from(''),
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({
      attachment,
    })
  }
}
