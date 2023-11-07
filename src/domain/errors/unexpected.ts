export class UnexpectedError extends Error {
  constructor() {
    super('An unexpected error was thrown, please try again.')
    this.name = 'UnexpectedError'
  }
}
