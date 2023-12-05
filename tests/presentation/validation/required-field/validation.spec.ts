import { RequiredFieldError } from "@/presentation/validation/errors/required-field-error"
import { RequiredFieldValidation } from "@/presentation/validation/required-field/validation"

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation
  beforeAll(() => {

  })
  beforeEach(() => {
    sut = new RequiredFieldValidation('email')
  })
  it('Should return error if field is empty', () => {
    const validateError = sut.validate('')
    expect(validateError).toEqual(new RequiredFieldError())
  })
})

