import { FieldValidation } from '../protocols/field-validation'
import { ValidationComposite } from '@/presentation/validation/validators/validation-composite/validation-composite'

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let fieldValidationSpy: FieldValidationSpy
  let fieldValidationSpy2: FieldValidationSpy
  beforeEach(() => {
    fieldValidationSpy = new FieldValidationSpy('any_field')
    fieldValidationSpy2 = new FieldValidationSpy('any_field')
    sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])
  })
  it('Should return error if any validation fails', () => {
    fieldValidationSpy2.error = new Error('any_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toEqual('any_error_message')
  })
  it('Should return empty if none validation fails', () => {
    const error = sut.validate('any_field', 'any_value')
    expect(error).toEqual('')
  })
})

class FieldValidationSpy implements FieldValidation {
  error: Error | null = null
  constructor(readonly field: string) { }
  validate(value: string): Error | null {
    return this.error
  }
}
