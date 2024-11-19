import { Ingreso } from "../../classes/Ingreso"
import useAxiosConf, { useAxios } from "../util/fetch.hook"
import { errorPop } from "../util/messages/alerts"

const URL_BASE = "api/v1/expense"

/**
 * Registro de egresos.
 * @returns Devuelve un mensaje con el resultado de la operacion.
 */
export const registrarEgreso = async (egreso) => {

     try {
        const request = await useAxiosConf.post(`${URL_BASE}/register`, egreso)
        return request;
     } catch (error) {
        errorPop("error al intentar conectarse con el servidor." + error)
     }
}

/**
 * Obtiene todos los registros de egresos
 * @returns Devuelve un listado de registros de egresos.
 */
export const useObtenerEgresos = (): [ Ingreso[], Error, boolean, Function] => {

	const [data, error, loading, doAxios] = useAxios<Ingreso[]>({
		method: "POST",
		triggered: true
	})

	const trigger = (ingresoFilter) => {
		doAxios({
			url: `${ URL_BASE }/getAll`,
			data: ingresoFilter
		})
	}
	
	return [data, error, loading, trigger]
}