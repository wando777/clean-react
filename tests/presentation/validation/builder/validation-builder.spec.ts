import { ValidationBuilder, RequiredFieldValidation, EmailValidation, MinLengthValidation } from "@/presentation/validation/validators"

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.of('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
  it('Should return EmailValidation', () => {
    const validations = ValidationBuilder.of('any_field').emailValidation().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
  it('Should return MinLengthValidation', () => {
    const validations = ValidationBuilder.of('any_field').minLength(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })
  it('Should return a list of validations', () => {
    const validations = ValidationBuilder.of('any_field').required().emailValidation().minLength(5).build()
    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
      new EmailValidation('any_field'),
      new MinLengthValidation('any_field', 5)
    ])
  })
})