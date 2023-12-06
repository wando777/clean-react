import { FieldValidation } from "../../protocols/field-validation"
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from ".."


export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) { }

  static of(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  emailValidation(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  minLength(minLenght: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, minLenght))
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}