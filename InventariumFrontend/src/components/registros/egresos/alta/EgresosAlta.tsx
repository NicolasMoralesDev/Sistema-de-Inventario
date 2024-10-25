import React, { useEffect, useState } from 'react'
import { obtenerProductosStorage, borrarProductosStorage, cargarProductosEgresoStorage } from '../../../../Hooks/util/localStorage/Abm.registros'
import { Helmet } from 'react-helmet'
import TablaProductosEgresos from './TablaProductosEgresos'
import { useObtenerProductoByCodigo } from "../../../../Hooks/fetch/Productos.hook"
import { useObtenerCategorias } from '../../../../Hooks/fetch/Categorias.hook'
import FormRegistrar from '../../FormRegistrar'
import { registrarEgreso } from '../../../../Hooks/fetch/Expense.hook'
import { loadingPop, successPop } from '../../../../Hooks/util/messages/alerts'
import { Producto } from '../../../../classes/Producto'

const EgresosAlta = () => {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(false)

    const [statusReg, setStatusReg] = useState("")
    const [productCargado, setProductCargado] = useState(false)
    const [productBorrado, setProductBorrado] = useState(false)

    const [categorias, errorObtenerCategorias, obteniendoCategorias, obtenerCategorias] = useObtenerCategorias()
    const [productoByCodigo, errorProductoByCodigo, obteniendoProductoByCodigo, obtenerProductoByCodigo] = useObtenerProductoByCodigo()

    const onFetch = async () => {
      const productosLocal = obtenerProductosStorage("productosEgresos")
      setProductos(productosLocal?.productos)
    }

    const onLoadStorage = (productos) => {
      cargarProductosEgresoStorage(productos, "productosEgresos")
      setProductCargado(true)
    }

    const onRegister = async () => {
       const data = obtenerProductosStorage("productosEgresos")
       const request : any = await registrarEgreso(data)
       setStatusReg(request.data.msg)
    }

    const onBorrado = (productos : Producto) => {
      borrarProductosStorage(productos, "productosEgresos")
      setProductBorrado(true)
    }

/*     const onGetByCode = (code) => {
      setLoading(true)
      obtenerProductoByCodigo(code)
      onLoadStorage(productoByCodigo)
    }
 */
    useEffect(() => { onFetch() }, [productCargado, productBorrado, onRegister])
    useEffect(() => { if(productos?.length > 0 ) { setLoading(false) } }, [productCargado, productBorrado])
    useEffect(() => { if(statusReg.length > 0) { successPop("Egreso registrado correctamente!", "egresoReg"), localStorage.removeItem("productosEgresos") } }, [statusReg])
    useEffect(() => { obtenerCategorias(), loadingPop("Obteniendo Categorias...", "categoriasLoadEgre") },  [obteniendoCategorias]) // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Alta de egresos</title>
        <link rel="canonical" href="http://mysite.com/example" />
     </Helmet>
     <FormRegistrar
        onSend={ onLoadStorage }
        categorias={ categorias }
        onRegister={ onRegister }
        isEgreso={ true }
      />
     <TablaProductosEgresos
        onSend={ onRegister }
        dataSourse={ productos }
        onBorrado={ onBorrado }
        categorias={ categorias }
        loading={ loading }
     />
    </>
  )
}

export default EgresosAlta