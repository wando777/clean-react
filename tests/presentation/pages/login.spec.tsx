import React from 'react'
import Login from '@/presentation/pages/login/login'
import { RenderResult, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { ValidationStub } from '../test/mock-validation'
import { AuthenticationSpy } from '../test/mock-authentication'
import { faker } from "@faker-js/faker"
import 'jest-localstorage-mock'

// import { Validation } from '../protocols'
// import { mock, type MockProxy } from 'jest-mock-extended'

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  fillEmailField(sut, email)
  fillPasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const fillEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const fillPasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

describe('Login component', () => {
  let sut: RenderResult
  let validationStub: ValidationStub
  let authenticationSpy: AuthenticationSpy
  // let validation: MockProxy<Validation>
  let email: string
  let password: string
  beforeAll(() => {
    validationStub = new ValidationStub()
    authenticationSpy = new AuthenticationSpy()
    email = faker.internet.email()
    password = faker.internet.password()
    // validation = mock()
    // validation.validate.mockReturnValueOnce(faker.string.alpha())
  })
  beforeEach(() => {
    // jest.clearAllMocks()
    localStorage.clear()
    validationStub.errorMessage = faker.string.alpha()
    sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
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
    fillEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❗️')
  })
  it('Should show password error when validation fails', () => {
    fillPasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('❗️')
  })
  it('Should show valid password state if validation succeeds', () => {
    validationStub.errorMessage = null
    fillPasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('great!')
    expect(passwordStatus.textContent).toBe('✅')
  })
  it('Should show valid email state if validation succeeds', () => {
    validationStub.errorMessage = null
    fillEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('great!')
    expect(emailStatus.textContent).toBe('✅')
  })
  it('Should enable submit button if form is valid', () => {
    validationStub.errorMessage = null
    fillEmailField(sut)
    fillPasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
  it('Should show loading spinner on submit', () => {
    validationStub.errorMessage = null
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
  it('Should call Authentication with correct values', () => {
    validationStub.errorMessage = null
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
  it('Should call Authentication only once', () => {
    authenticationSpy.callsCount = 0
    validationStub.errorMessage = null
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })
  it('Should not call Authentication if form is invalid', () => {
    authenticationSpy.callsCount = 0
    fillEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
  // it('Should trigger an error if Authentication fails', async () => {
  //   authenticationSpy.callsCount = 0
  //   const error = new InvalidCredentialsError()
  //   jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
  //   simulateValidSubmit(sut, email, password)
  //   const errorWrap = sut.getByTestId('error-wrap')
  //   await waitFor(() => errorWrap)
  //   const mainError = sut.getByTestId("main-error")
  //   expect(mainError.textContent).toBe(error.message)
  //   expect(errorWrap.childElementCount).toBe(1)
  // })
  it('Should add accessToken to localstorage on success', async () => {
    // authenticationSpy.callsCount = 0
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'any_accessToken')
  })
  // it('Should take the user to signup page', async () => {
  //   // authenticationSpy.callsCount = 0
  //   simulateValidSubmit(sut)
  //   const signUp = sut.getByTestId('signup')
  //   fireEvent.click(signUp)
  // })
})