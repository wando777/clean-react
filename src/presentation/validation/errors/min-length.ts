export class MinLengthError extends Error {
  constructor(field: string) {
    super(`${field} has an invalid length`)
    this.name = 'MinLengthError'
  }
}