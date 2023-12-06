import { Validation } from "@/presentation/protocols"
import { FieldValidation } from "@/presentation/validation/protocols/field-validation"

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) { }
  validate(fieldName: string, fieldValue: string): string {
    const filteredValidators = this.validators.filter(v => v.field === fieldName)
    for (const validator of filteredValidators) {
      const error = validator.validate(fieldValue)
      if (error) {
        return error.message
      }
    }
    return ''
  }
}