import { Usuario } from "../../classes/Usuario"
import { useAxios } from "../util/fetch.hook"

const URL_BASE = "api/users"

/**
 * Obtiene todos los usuarios.
 * @returns Devuelve un array con los usuarios existentes.
 */
export const useObtenerUsuarios = (): [ Usuario[], Error, boolean, Function]  => {

	const [data, error, loading, doAxios] = useAxios<Usuario[]>({
		method: "GET",
		url: `${ URL_BASE }/getAll`,
	})

	return [data, error, loading, doAxios]
}