import { UploaderGateway } from '../gateways/storage/uploader'
import { Module } from '@nestjs/common'
import { R2Storage } from './r2-storage'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: UploaderGateway,
      useClass: R2Storage,
    },
  ],
  exports: [UploaderGateway],
})
export class StorageModule {}
