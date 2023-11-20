import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinners/login'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'

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
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>ERROR</span>
        </div>
      </form>
      <Footer />
    </div >
  )
}

export default Login