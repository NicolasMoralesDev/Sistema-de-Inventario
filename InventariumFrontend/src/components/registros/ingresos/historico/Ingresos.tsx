import React, { useEffect, useState } from "react"
import { modificarIngresos, useObtenerIngresos } from "../../../../Hooks/fetch/Ingresos.hook"
import { Helmet } from "react-helmet"
import ModalEdit from "./ModalEdit"
import TablaRegistros from "../../TablaRegistros"
import { errorPop, loadingPop, successPop } from "../../../../Hooks/util/messages/alerts"
import useForm from "antd/lib/form/hooks/useForm"
import { columnsIngresos } from "../../registros.constants.table"
import IngresosFiltro from "./IngresosFiltro"

const Ingresos = () => {

  const [form] = useForm()
  const [ingresoEdit, setIngresoEdit] = useState([])
  const [visibleEdit, setVisibleEdit] = useState(false)

  const [statusEdit, setStatusEdit] = useState("")
  
  const [registroFilterDefault, setRegistroFilterDefault] = useState({})

  const [ingresos, errorObtenerIngresos, obteniendoIngresos, obtenerIngresos] = useObtenerIngresos()

  useEffect(() => { obtenerIngresos(registroFilterDefault) }, [ visibleEdit ])

  useEffect(() => { errorObtenerIngresos && errorPop(errorObtenerIngresos?.message) }, [errorObtenerIngresos])

  useEffect(() => { obtenerIngresos && loadingPop("Obteniendo Registros....") }, [obteniendoIngresos])

  useEffect(() => { if (statusEdit) { successPop(statusEdit) } }, [statusEdit])

  const onEdit = async (ingreso) => {
    const request = await modificarIngresos(ingreso)
    setVisibleEdit(false)
    setStatusEdit(request.data.msg)
  }

  const onFilterIngresos = (filter) => {
     obtenerIngresos(filter)
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Historico de ingresos</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {visibleEdit &&
        <ModalEdit
          form={ form }
          ingresoEdit={ ingresoEdit }
          visible={ visibleEdit }
          setVisible={ setVisibleEdit }
          onSend={ onEdit }
        />
      }
      <IngresosFiltro 
        obtenerIngresos={ onFilterIngresos }
      />
      <TablaRegistros
        setIngresoEdit={ setIngresoEdit }
        setVisibleEdit={ setVisibleEdit }
        dataSourse={ ingresos }
        loading={ obteniendoIngresos }
        columnas={ columnsIngresos }
      />
    </>
  )
}

export default Ingresos