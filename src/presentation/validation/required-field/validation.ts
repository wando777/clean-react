import { RequiredFieldError } from "../errors/required-field-error";
import { FieldValidation } from "../protocols/field-validation";

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {
  }

  validate(fieldValue: string): Error | null {
    return fieldValue ? null : new RequiredFieldError()
  }
}