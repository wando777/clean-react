import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: ''
  })
  const [errorState] = useState({
    email: 'Mandatory field',
    password: 'Mandatory field',
    main: ''
  })
  return (
    <div className={Styles.login} >
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='enter your email' />
          <Input type='password' name='password' placeholder='enter your password' />
          <button data-testid="submit" disabled className={Styles.submit} type='submit'>Submit</button>
          <span className={Styles.signup}> Sign up </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div >
  )
}

export default Login