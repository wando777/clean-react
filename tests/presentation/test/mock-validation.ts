import { Validation } from "@/presentation/protocols"

export class ValidationStub implements Validation {
  errorMessage!: string | null
  fieldName!: string
  fieldValue!: string

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage!;
  }
}