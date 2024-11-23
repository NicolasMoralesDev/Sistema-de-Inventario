import { errorPop } from "../util/messages/alerts"
import useAxiosConf, { useAxios } from "../util/fetch.hook"
import { Proveedor } from "../../classes/Proveedor"

const URL_BASE = "api/v1/supplier"

/**
 * Obtiene todos los proveedores.
 * @returns Devuelve un array con los proveedores existentes.
 */
export const useObtenerProveedores = (): [ Proveedor[], Error, boolean, Function]  => {

     const [data, error, loading, doAxios] = useAxios<Proveedor[]>({
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
export const registrarProveedor = async (Proveedor) => {

     try {
        const request = await useAxiosConf.post(`${URL_BASE}/create`, Proveedor)
        return request
     } catch (error) {
        errorPop("error al intentar conectarse con el servidor." + error)
     }
}

/**
 * Modificacion de proveedores.
 * @returns Devuelve un mensaje con el resultado de la operacion.
 */
export const editarProveedor = async (Proveedor) => {

     try {
        const request = await useAxiosConf.put(`${URL_BASE}/edit`, Proveedor)
        return request;
     } catch (error) {
        errorPop("error al intentar conectarse con el servidor." + error)
     }
}

/**
 * Realiza borrado multiple de proveedores.
 * @returns Devuelve el estado de la operacion.
 */
export const borradoMultipleProveedores = async (ProveedoresIds) => {

     try {
       const request = await useAxiosConf.post(`${URL_BASE}/delete/bulk`, ProveedoresIds)
       return request;   
     } catch (error) {
          errorPop("error al intentar conectarse con el servidor."+ error)
     } 
}