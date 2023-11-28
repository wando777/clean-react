import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'
import { ValidationStub } from '../test/mock-validation'
import React from 'react'
import { faker } from "@faker-js/faker"
// import { Validation } from '../protocols'
// import { mock, type MockProxy } from 'jest-mock-extended'

describe('Login component', () => {
  let sut: RenderResult
  let validationStub: ValidationStub
  // let validation: MockProxy<Validation>
  let email: string
  let password: string
  beforeAll(() => {
    validationStub = new ValidationStub()
    email = faker.internet.email()
    password = faker.internet.password()
    validationStub.errorMessage = faker.string.alpha()
    // validation = mock()
    // validation.validate.mockReturnValueOnce(faker.string.alpha())
  })
  beforeEach(() => {
    jest.clearAllMocks()
    sut = render(<Login validation={validationStub} />)
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
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❗️')
    expect(passwordStatus.textContent).toBe('❗️')
  })
  // it('Should call Validation with correct email', () => {
  //   const emailInput = sut.getByTestId('email')
  //   fireEvent.input(emailInput, { target: { value: email } })
  //   expect(validationStub.fieldName).toBe('email')
  //   expect(validationStub.fieldValue).toBe(email)
  // })
  // it('Should call Validation with correct password', () => {
  //   const passwordInput = sut.getByTestId('password')
  //   fireEvent.input(passwordInput, { target: { value: password } })
  //   expect(validationStub.fieldName).toBe('password')
  //   expect(validationStub.fieldValue).toBe(password)
  // })
  it('Should show email error when validation fails', () => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❗️')
  })
  it('Should show password error when validation fails', () => {
    const emailInput = sut.getByTestId('password')
    fireEvent.input(emailInput, { target: { value: password } })
    const emailStatus = sut.getByTestId('password-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❗️')
  })
  it('Should show valid password state if validation succeeds', () => {
    const emailInput = sut.getByTestId('password')
    validationStub.errorMessage = null
    fireEvent.input(emailInput, { target: { value: password } })
    const emailStatus = sut.getByTestId('password-status')
    expect(emailStatus.title).toBe('great!')
    expect(emailStatus.textContent).toBe('✅')
  })
})