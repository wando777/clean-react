import { faker } from '@faker-js/faker'
import { MinLengthError } from '@/presentation/validation/errors'
import { MinLengthValidation } from '@/presentation/validation/validators/min-length/min-length-validation'

describe('MinLengthValidation', () => {
  let sut: MinLengthValidation
  let field: string
  beforeAll(() => {
    field = faker.lorem.words()
  })
  beforeEach(() => {
    sut = new MinLengthValidation(field, 2)
  })
  it('Should return error if field is invalid', () => {
    const validationError = sut.validate('a')
    expect(validationError).toEqual(new MinLengthError(field))
  })
  it('Should return false if field is valid', () => {
    const validationError = sut.validate(field)
    expect(validationError).toBeFalsy()
  })
})
