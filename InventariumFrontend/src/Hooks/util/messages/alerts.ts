import { message } from "antd" 
import Swal from "sweetalert2" 

/**
 * PopUp con mensaje de info.
 * @param msg Recibe el mensaje a mostrar.
 * @param key
 */
 export const infoPop = (msg: string, key?: string) => {
   message.info({ content: msg, key: key, duration: 10 }) 
 } 

/**
 * PopUp con mensaje de error.
 * @param msg Recibe el mensaje a mostrar.
 * @param key
 */
 export const errorPop = (msg: string, key?: string) => {
   message.error({ content: msg, key: key }) 
 } 

/**
 * PopUp con mensaje de carga.
 * @param msg Recibe el mensaje a mostrar.
 * @param key
 */
 export const loadingPop = (msgCargando: string, key?: string) => {
   message.loading({ content: msgCargando, key: key }) 
 } 

/**
 * PopUp con mensage de exito.
 * @param msg Recibe el mensaje a mostrar.
 * @param key
 */
 export const successPop = (msg: string, key?: string) => {
   return message.success({ content: msg, key: key, duration: 5 }) 
 } 

/**
 * PopUp con mensage de Confirmacion de Accion.
 * @param msg Recibe el mensaje a mostrar.
 * @param icon Recibe el tipo de icono a mostrar.
 * @param funcion Recibe la funcion a ejecutar si se confirme la accion.
 */
 export const alertPop = (msg: string, icon, funcion) => {
   Swal.fire({
     text: msg,
     icon: icon,
     showDenyButton: true,
     confirmButtonText: "Confirmar",
     denyButtonText: `Cancelar`,
   }).then((result) => {
     if (result.isConfirmed) {
       funcion() 
     }
   }) 
 } 

/**
 * PopUp con mensage de informacion.
 * @param msg Recibe el mensaje a mostrar.
 * @param icon Recibe el tipo de icono a mostrar.
 */
 export const popUp = (msg: string, icon) => {
   Swal.fire({
     position: "top",
     icon: icon,
     title: msg,
     showConfirmButton: false,
     timer: 1800,
   }) 
 } 
