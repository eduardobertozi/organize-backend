import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'
import { EncrypterGateway } from './encrypter'
import { HashComparerGateway, HashGeneratorGateway } from './hasher'

@Module({
  providers: [
    {
      provide: EncrypterGateway,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparerGateway,
      useClass: BcryptHasher,
    },
    {
      provide: HashGeneratorGateway,
      useClass: BcryptHasher,
    },
  ],
  exports: [EncrypterGateway, HashComparerGateway, HashGeneratorGateway],
})
export class CryptographyModule {}
