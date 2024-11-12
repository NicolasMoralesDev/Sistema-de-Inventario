import React, { useEffect } from 'react'
import TablaUsuarios from './TablaUsuarios'
import { Helmet }  from 'react-helmet'
import { useObtenerUsuarios } from '../../Hooks/fetch/Usuarios.hook'
import { errorPop, loadingPop } from '../../Hooks/util/messages/alerts'

const Usuarios =  () => {
    
    const [usuarios, errorObtenerUsuarios, obteniendoUsuarios, obtenerUsuarios] = useObtenerUsuarios()

    useEffect(() => { obteniendoUsuarios && loadingPop("Obteniendo Usuarios...", "usuarios") },  [obteniendoUsuarios]) // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => { errorObtenerUsuarios && errorPop(errorObtenerUsuarios?.message, "usuarios") }, [errorObtenerUsuarios])

    useEffect(() => { obtenerUsuarios() }, [])

  return (
    <div>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Gestion de usuarios</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <TablaUsuarios
      dataSourse={ usuarios }
      loading={ obteniendoUsuarios }
    />
    </div>
  )
}

export default Usuarios