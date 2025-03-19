import { Module } from '@nestjs/common'
import { DatabaseAttachmentsModule } from './database/database-attachment.module'
import { AttachmentsFactory } from './test/attachments-factory'

@Module({
  imports: [DatabaseAttachmentsModule],
  providers: [AttachmentsFactory],
  exports: [],
})
export class AttachmentsModule {}
