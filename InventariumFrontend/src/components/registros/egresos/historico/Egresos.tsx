import React, { useEffect, useState } from 'react'
import TablaRegistros from '../../TablaRegistros'
import { Helmet } from 'react-helmet'
import { columnsEgresos } from '../../registros.constants.table'
import RegistroFiltro from '../../RegistroFiltro'
import { useObtenerEgresos } from '../../../../Hooks/fetch/Expense.hook'
import { errorPop, loadingPop } from '../../../../Hooks/util/messages/alerts'

const Egresos = () => {
  
  const [egresos, errorObtenerEgresos, obteniendoEgresos, obtenerEgresos] = useObtenerEgresos()

  const [registroFilterDefault] = useState({})

  const onFetch = () => {
    obtenerEgresos(registroFilterDefault)
  }

  useEffect(() => { errorObtenerEgresos && errorPop(errorObtenerEgresos?.message) }, [errorObtenerEgresos])

  useEffect(() => { obteniendoEgresos && loadingPop("Obteniendo Registros....") }, [obteniendoEgresos])

  useEffect(() => { onFetch() }, [])
  
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Historico de egresos</title>
        <link rel="canonical" href="http://mysite.com/example" />
     </Helmet>
    <RegistroFiltro
      obtenerIngresos={ obtenerEgresos }
     />
    <TablaRegistros
      dataSourse={ egresos }
      loading={ obteniendoEgresos }
      columnas={ columnsEgresos }
    />
    </>
  )
}

export default Egresos