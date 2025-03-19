import { Attachment } from './test/attachment'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
