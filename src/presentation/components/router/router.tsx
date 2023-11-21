import React from "react";
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import '@/presentation/styles/global.scss'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" Component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router