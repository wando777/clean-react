import { MinLengthError } from "../../errors";
import { FieldValidation } from "../../protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) { }
  validate(value: string): Error | null {
    return (value.length >= this.minLength) ? null : new MinLengthError(this.field)
  }
}