import { jwtDecode } from "jwt-decode"
import Cookies from "universal-cookie"
import { popUp } from "./messages/alerts"
import { useLoadLocal } from "./localStorage/Auth"

const cookies = new Cookies()

/**
 * Funcion de logIng recibe y verifica datos del servidor.
 * @param {*} token Recibe el token de la session.
 */
export const onAuth = (token) => {

  const date : any = new Date() 
  date.setTime(new Date(new Date().getTime() + 1800000)) 
  const user : any = jwtDecode(token) 
  useLoadLocal(user.nombreCompleto, user.authorities) 

  cookies.set("token", token, { path: "/", expires: date }) 
  popUp("¡Bienvenido " + user.nombreCompleto + "!", "success") 
} 

/**
 * Funcion verificadora de session de usuario.
 * @returns valor si el usuario esta o no logueado.
 */
export const useUser = () => {
  let isAuthenticated : Boolean = false 

  if (cookies.get("token")) {
    isAuthenticated = true 
  } 

  return {
    isAuthenticated,
  } 
} 

/**
 * Funcion verificadora de rol.
 * @returns valor si el usuario es o no permitido.
 */
export const usePermission = (permiso) => {
  let isPermitted : Boolean = false 

  if (localStorage.getItem("permisos")?.match(permiso)) {
    isPermitted = true 
  } 

  return isPermitted
} 

/**
 * Funcion de logOut, quta los datos de session y el token.
 */
export const onLogOut = () => {
  popUp("Gracias por visitarnos!", "success") 
  location.replace("/login") 
  localStorage.removeItem("usuario") 
  localStorage.removeItem("permisos") 
  cookies.remove("token") 
} 
