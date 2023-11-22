import React, { useContext } from 'react'
import Spinner from '../spinners/login'
import Styles from './form-status-styles.scss'
import formContext from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(formContext)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus