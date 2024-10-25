import React, { ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Routing from './Routes'
import Login from '../components/login/Login'

interface RoutingLoginProps {
    children? : ReactNode
}

export const RoutingLogin = (prop : RoutingLoginProps) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={ <Login/> } />
                <Route path="/*" element={ <Routing/> } />            
            </Routes>
        </BrowserRouter>
    )
}
export default RoutingLogin