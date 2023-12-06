import { ValidationBuilder, RequiredFieldValidation } from "@/presentation/validation/validators"

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.of('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})