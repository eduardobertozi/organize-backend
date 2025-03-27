import { AttachmentsRepository } from '@/domain/attachments/application/repositories/attachments.repository'
import { Attachment } from '@/domain/attachments/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
    await Promise.resolve()
  }
}
