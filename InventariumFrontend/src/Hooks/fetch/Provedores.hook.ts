import { errorPop } from "../util/messages/alerts"
import useAxiosConf, { useAxios } from "../util/fetch.hook"
import { Provedor } from "../../classes/Provedor"

const URL_BASE = "api/v1/supplier"

/**
 * Obtiene todos los proveedores.
 * @returns Devuelve un array con los proveedores existentes.
 */
export const useObtenerProveedores = (): [ Provedor[], Error, boolean, Function]  => {

     const [data, error, loading, doAxios] = useAxios<Provedor[]>({
		method: "GET",
		triggered: true,
          url: `${ URL_BASE }/getAll`
	})
	
	return [data, error, loading, doAxios]
}

/**
 * Registro de proveedores.
 * @returns Devuelve un mensaje con el resultado de la operacion.
 */
export const registrarProvedor = async (provedor) => {

     try {
        const request = await useAxiosConf.post(`${URL_BASE}/create`, provedor)
        return request
     } catch (error) {
        errorPop("error al intentar conectarse con el servidor." + error)
     }
}

/**
 * Modificacion de proveedores.
 * @returns Devuelve un mensaje con el resultado de la operacion.
 */
export const editarProvedor = async (provedor) => {

     try {
        const request = await useAxiosConf.put(`${URL_BASE}/edit`, provedor)
        return request;
     } catch (error) {
        errorPop("error al intentar conectarse con el servidor." + error)
     }
}

/**
 * Realiza borrado multiple de proveedores.
 * @returns Devuelve el estado de la operacion.
 */
export const borradoMultipleProvedores = async (provedoresIds) => {

     try {
       const request = await useAxiosConf.post(`${URL_BASE}/delete/bulk`, provedoresIds)
       return request;   
     } catch (error) {
          errorPop("error al intentar conectarse con el servidor."+ error)
     } 
}