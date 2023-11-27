import React from "react";
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import { Login } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" Component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

// const makeLogin: React.FC = () => {
//   return (
//     <Login validation={makeLoginValidation()}    
//     />
//   )
// }

export default Router