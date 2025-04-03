export class AlreadyExistsError extends Error {
  constructor() {
    super('Este item já existe.')
    this.name = 'AlreadyExistsError'
  }
}
