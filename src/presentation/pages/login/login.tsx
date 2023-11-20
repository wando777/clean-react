import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinners/login'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.login} >
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type='email' name='email' placeholder='enter your email'></input>
          <span className={Styles.status}>❗️</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type='password' name='password' placeholder='enter your password'></input>
          <span className={Styles.status}>❗️</span>
        </div>
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