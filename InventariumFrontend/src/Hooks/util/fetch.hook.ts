
// axios configuracion
import axios, { AxiosRequestConfig } from "axios"
import Cookies from "universal-cookie"
import { errorPop } from "./messages/alerts"
import { useStateIfMounted } from "use-state-if-mounted"
import { useCallback } from "react"

const url = ["http://localhost:8080/"]
const cookies = new Cookies()

/* 
 * Opciones para el hook
*/
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
interface CustomHookOptions extends AxiosRequestConfig {
   onLoading?: Function
   onFinally?: Function
   onSuccess?: Function
   onError?: Function
   triggered?: boolean
}

const baseUrl = url[0]

const useAxiosConf = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
})

let token

useAxiosConf.interceptors.request.use(
	(config) => {
		token = cookies.get("token")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

    const doAxios = async (options)  => {
		const token = cookies.get("token")
		
		axios
			.request({
				baseURL: baseUrl,
				method: options.method,
				url: options.url,
				data: options?.data,
				headers: {
					"Content-Type": "application/json",
					"Authorization": token != null ?  `Bearer ${ token }` : null,
				},
			})
			.then((request) => options?.onSuccess(request))
			.catch((error) => options?.onError(error?.response?.data))
   }

    export const useAxios = <T>(options: CustomHookOptions): [T, Error, boolean, Function] => {
	   const [loading, setLoading] = useStateIfMounted<boolean>(false)
	   const [error, setError] = useStateIfMounted<Error>(undefined)
	   const [data, setData] = useStateIfMounted(undefined)

	   const stopLoading = () => setTimeout(() => setLoading(false), 500)

    	const procesarError = (error) => {
			
    		if (error) {
	    		if (error.status == 415) {
    			   errorPop('Los datos que se intentan enviar son invalidos')
			    }
	    		const erro = new Error(error)
				if (error.error) {
					erro.message = error.error
				} else {
					erro.message = "Usuario no autorizado"
				}
	    		setError(erro)
	    	} else {
	    		errorPop('Error al intentar conectarse con el servidor', 'servidor')
	    	}
	    	stopLoading()
	    }

	    const trigger = useCallback(async (custom?: CustomHookOptions) => {
	    	setError(undefined) // Reinicia el error antes de hacer la llamada
	    	setLoading(true)

	    	try {
	    		await doAxios({
	    			method: custom?.method || options.method,
	    			url: custom?.url || options.url,
	    			data: custom?.data || options.data,
					onError: (error) => procesarError(error),
	    			onSuccess: (response) => {
	   				if (response.data) {
						setData(response.data)
					}
					stopLoading()
				},
			})
		} catch (error) {
			procesarError(error)
		} 

	}, [options]);

	return [data, error, loading, trigger]
}

export default useAxiosConf 
