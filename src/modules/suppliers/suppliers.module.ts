import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module'
import { StorageModule } from '@/infrastructure/storage/storage.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [CryptographyModule, StorageModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class SuppliersModule {}
