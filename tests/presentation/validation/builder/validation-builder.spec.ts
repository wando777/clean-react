import { ValidationBuilder, RequiredFieldValidation, EmailValidation } from "@/presentation/validation/validators"

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.of('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
  it('Should return EmailValidation', () => {
    const validations = ValidationBuilder.of('any_field').emailValidation().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})