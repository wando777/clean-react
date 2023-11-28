import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'
import { ValidationSpy } from '../test/mock-validation'
import React from 'react'
import { faker } from "@faker-js/faker"

describe('Login component', () => {
  let sut: RenderResult
  let validationSpy: ValidationSpy
  let email: string
  let password: string
  beforeAll(() => {
    validationSpy = new ValidationSpy()
    email = faker.internet.email()
    password = faker.internet.password()
    validationSpy.errorMessage = faker.string.alpha()
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
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.title).toBe('Mandatory field')
    expect(emailStatus.textContent).toBe('❗️')
    expect(passwordStatus.textContent).toBe('❗️')
  })
  it('Should call Validation with correct email', () => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })
  it('Should call Validation with correct password', () => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })
  it('Should show email error when validation fails', () => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('❗️')
  })
})