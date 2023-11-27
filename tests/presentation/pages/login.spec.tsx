import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'

describe('Login component', () => {
  let sut: RenderResult
  beforeEach(() => {
    jest.clearAllMocks()
    sut = render(<Login />)
  })
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
})
