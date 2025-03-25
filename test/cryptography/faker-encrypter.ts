import { EncrypterGateway } from '@/infra/gateways/cryptography/encrypter'

export class FakeEncrypter implements EncrypterGateway {
  encrypt(payload: Record<string, unknown>): Promise<string> {
    return Promise.resolve(JSON.stringify(payload))
  }
}
