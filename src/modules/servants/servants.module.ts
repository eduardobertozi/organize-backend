import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module'
import { DatabaseModule } from '@/infrastructure/database/database.module'
import { StorageModule } from '@/infrastructure/storage/storage.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [],
  providers: [],
})
export class ServantsModule {}
