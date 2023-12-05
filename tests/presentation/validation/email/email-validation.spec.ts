import { faker } from "@faker-js/faker"
import { InvalidFieldError } from "@/presentation/validation/errors"
import { EmailValidation } from "@/presentation/validation/validators/email/email-validations"

describe('EmailValidation', () => {
  let sut: EmailValidation
  let email: string
  beforeAll(() => {
    email = faker.internet.email()
  })
  beforeEach(() => {
    sut = new EmailValidation('email')
  })
  it('Should return error if email is invalid', () => {
    const validationError = sut.validate('any_invalid_email')
    expect(validationError).toEqual(new InvalidFieldError('email'))
  })
  it('Should return false if email is valid', () => {
    const validationError = sut.validate(email)
    expect(validationError).toBeFalsy()
  })
})



