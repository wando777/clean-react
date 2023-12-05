import { RequiredFieldError } from "@/presentation/validation/errors"
import { RequiredFieldValidation } from "@/presentation/validation/validators/required-field/validation"
import { faker } from "@faker-js/faker"

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation
  let email: string
  beforeAll(() => {
    email = faker.internet.email()
  })
  beforeEach(() => {
    sut = new RequiredFieldValidation('email')
  })
  it('Should return error if field is empty', () => {
    const validateError = sut.validate('')
    expect(validateError).toEqual(new RequiredFieldError())
  })
  it('Should return false if field is not empty', () => {
    const validateError = sut.validate(email)
    expect(validateError).toBeFalsy()
  })
})

