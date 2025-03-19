export interface UploadParams {
  fileName: string
  fileType: string
  body: Buffer
}

export abstract class UploaderGateway {
  abstract upload(params: UploadParams): Promise<{ url: string }>
}
