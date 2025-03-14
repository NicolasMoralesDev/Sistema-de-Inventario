import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom' 
import { usePermission } from '../../Hooks/util/auth.hook' 

/**
 * Configuracion de rutas protegidas, verifica si el usuario esta autorizado.
 * @param {*} param0 
 * @returns conjunto de rutas.
 */
const ProtectedPermission = ({ children, permission }) => {

    const authorized = usePermission(permission)
    const navigate = useNavigate()

   // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!authorized) {
            navigate("/*")
        }
    }, [navigate, authorized])  
  
    return (children ? children : <Outlet/>)
}

export default ProtectedPermission