import React from 'react'
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'
import { Validation } from '../protocols'

class ValidationSpy implements Validation {
  errorMessage!: string
  fieldName!: string
  fieldValue!: string

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage;
  }
}

// const makeSut = () => {
//   const validationSpy = new ValidationSpy()
//   const sut = render(<Login validation={validationSpy} />)
//   return {
//     sut,
//     validationSpy
//   }
// }

describe('Login component', () => {
  let sut: RenderResult
  let validationSpy: ValidationSpy
  beforeAll(() => {
    validationSpy = new ValidationSpy()
  })
  beforeEach(() => {
    jest.clearAllMocks()
    sut = render(<Login validation={validationSpy} />)
  })
  afterEach(cleanup)
  it('Should not render errors feedback when starting', () => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
  it('Should start with initial state', () => {
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe('Mandatory field')
    expect(passwordStatus.title).toBe('Mandatory field')
    expect(emailStatus.textContent).toBe('❗️')
    expect(passwordStatus.textContent).toBe('❗️')
  })
  it('Should call Validation with correct email', () => {
    // const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })
  it('Should call Validation with correct password', () => {
    // const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })

})