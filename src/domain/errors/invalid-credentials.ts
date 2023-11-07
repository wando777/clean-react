export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials, please review your data and try again.')
    this.name = 'InvalidCredentialsError'
  }
}
