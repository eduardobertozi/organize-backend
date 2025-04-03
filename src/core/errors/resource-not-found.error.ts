export class ResourceNotFoundError extends Error {
  constructor() {
    super('Item não encontrado.')
    this.name = 'NotFoundError'
  }
}
