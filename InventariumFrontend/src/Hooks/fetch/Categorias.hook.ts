import { useAxios } from "../util/fetch.hook"
import { Categoria } from "../../classes/Categoria"

const URL_BASE = "api/v1/category"

/**
 * Obtiene todas las categorias.
 * @returns Devuelve un listado de las categorias existentes.
 */
export const useObtenerCategorias = (): [Categoria[], Error, boolean, Function]  => {

     const [data, error, loading, trigger] = useAxios<Categoria[]>({
		method: "GET",
		url: `${ URL_BASE }/getAll`,
		triggered: true
	})

	return [data, error, loading, trigger]
}
