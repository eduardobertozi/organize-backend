import {
  UploaderGateway,
  UploadParams,
} from '@/infra/gateways/storage/uploader'
import { randomUUID } from 'crypto'

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements UploaderGateway {
  public uploads: Upload[] = []

  upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = randomUUID()

    this.uploads.push({
      fileName,
      url,
    })

    return Promise.resolve({ url })
  }
}
