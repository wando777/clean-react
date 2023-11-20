import React from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'


const Login: React.FC = () => {
  return (
    <div className={Styles.login} >
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='enter your email' />
        <Input type='password' name='password' placeholder='enter your password' />
        <button className={Styles.submit} type='submit'>Submit</button>
        <span className={Styles.signup}> Sign up </span>
        <FormStatus />
      </form>
      <Footer />
    </div >
  )
}

export default Login