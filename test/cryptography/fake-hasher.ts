import {
  HashComparerGateway,
  HashGeneratorGateway,
} from '@/infra/gateways/cryptography/hasher'

export class FakeHasher implements HashGeneratorGateway, HashComparerGateway {
  async hash(plain: string): Promise<string> {
    return Promise.resolve(plain.concat('-hashed'))
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return Promise.resolve(plain.concat('-hashed') === hash)
  }
}
