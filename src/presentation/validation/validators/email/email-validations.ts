import { InvalidFieldError } from "../../errors";
import { FieldValidation } from "../../protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {
  }
  validate(value: string): Error | null {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(value) ? null : new InvalidFieldError(this.field)
  }
}