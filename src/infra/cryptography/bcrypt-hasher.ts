import {
  HashComparerGateway,
  HashGeneratorGateway,
} from '../gateways/cryptography/hasher'
import { hash, compare } from 'bcryptjs'

export class BcryptHasher implements HashGeneratorGateway, HashComparerGateway {
  private readonly HASH_SALT_LENGTH = 8

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_LENGTH)
  }
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
