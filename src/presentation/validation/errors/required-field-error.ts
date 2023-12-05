export class RequiredFieldError extends Error {
  constructor() {
    super('Mandatory field')
    this.name = 'RequiredFieldError'
  }
}