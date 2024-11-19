import { errorPop } from "../util/messages/alerts"
import useAxiosConf, { useAxios } from "../util/fetch.hook"
import { Producto } from "../../classes/Producto"
import dayjs, { Dayjs } from "dayjs"
import { FECHA_FORMATO_BARRAS } from "../../constants/fechasFarmatos"

const URL_BASE = "api/v1/product"

/**
 * Obtiene todos los productos.
 * @returns Devuelve un listado de productos.
 */
export const obtenerProductos = async () => {
	try {
		const request = await useAxiosConf.get(`${URL_BASE}/getAll`)
		return request
	} catch (error) {
		errorPop("error al intentar conectarse con el servidor.")
	}
}

/**
 * Obtiene todos los productos.
 * @returns Devuelve un listado de productos.
 */
export const useObtenerProductos = (): [ Producto[], Error, boolean, Function]  => {
	const [data, error, loading, doAxios] = useAxios<Producto[]>({
		method: "POST",
		triggered: true
	})

	const trigger = (productoFilter) => {
		doAxios({
			url: `${ URL_BASE }/getAll`,
			data: productoFilter
		})
	}
	
	return [data, error, loading, trigger]
}

/**
 * Busca productos por su código de barras.
 * @returns Devuelve el producto relacionado con el código.
 */
export const useObtenerProductoByCodigo = ():  [Producto, Error, boolean, Function]  => {
	const [data, error, loading, doAxios] = useAxios<Producto>({
		method: "GET",
	})

	const trigger = (code) => {
		doAxios({
			url: `${ URL_BASE }/get/code/${ code }`
		})
	}

	return [data, error, loading, trigger]
}

/**
 * Realiza borrado multiple de productos.
 * @returns Devuelve un listado de productos.
 */
export const borradoMultipleProductos = async (productosIds) => {
	try {
		const request = await useAxiosConf.post(
			`${URL_BASE}/delete/bulk`,
			productosIds,
		);
		return request;
	} catch (error) {
		errorPop("error al intentar conectarse con el servidor.")
	}
}

/**
 * Realiza editado de productos.
 * @returns Devuelve un mensaje con el estado de la operacion.
 */
export const useEditarProducto = ():  [any, Error, boolean, Function] => {
	const [data, error, loading, doAxios] = useAxios<any>({
		method: "PUT",
	})

	const trigger = (data) => {
		doAxios({
			url: `${ URL_BASE }/put`,
			data: JSON.stringify(data) 
		})
	}

	return [data, error, loading, trigger]
}

/**
 * Realiza la carga de productos.
 * @returns Devuelve un mensaje con el estado de la operacion.
 */
export const crearProducto = async (producto) => {
	try {
		const request = await useAxiosConf.post(`${URL_BASE}/post`, producto)
		return request;
	} catch (error) {
		errorPop(`Error ${error}`)
	}
}

/**
 * Genera un reporte PDF con los productos selccionados.
 * @returns Devuelve un mensaje con el estado de la operacion y el reporte PDF.
 */
export const genearReportePDFproductos = async (productosIds) => {
	try {
		const request = await useAxiosConf.post(
			`${ URL_BASE }/generate/pdf`,
			productosIds
			, { responseType: 'blob' }
		)
		const url = URL.createObjectURL(request.data)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', `reporte_mercaderia-`+ dayjs().format(FECHA_FORMATO_BARRAS)+`.pdf`)
		document.body.appendChild(link)
		link.click()
		link.remove()
		
	} catch (error) {
		errorPop(`Error ${ error }`)
	}
}
