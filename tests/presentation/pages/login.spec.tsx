import React from 'react'
import { render } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'

describe('Login component', () => {
  it('Should not render errors feedback when starting', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
