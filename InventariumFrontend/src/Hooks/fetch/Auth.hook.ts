import { useAxios } from "../util/fetch.hook"

const URL_BASE = "api/auth"

/**
 * Login de usuarios.
 * @returns Devuelve el token (si el usuario es valido) o sino un error.
 */
export const useLoginUsuarios = (): [ any, Error, boolean, Function]  => {

     const [data, error, loading, doAxios] = useAxios({
        method: "POST",
        triggered: true
     })

     const trigger = (user) => {
        doAxios({
            url: `${ URL_BASE }/login`,
            data: user
        })
      }

      return [data, error, loading, trigger]
}