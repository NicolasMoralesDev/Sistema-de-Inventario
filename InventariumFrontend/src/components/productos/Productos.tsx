
import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { useObtenerCategorias } from "../../Hooks/fetch/Categorias.hook"
import { crearProducto, genearReportePDFproductos, useBorradoMultipleProductos, 
         useEditarProducto, useObtenerProductoByCodigo, useObtenerProductos } from "../../Hooks/fetch/Productos.hook"
import TablaProductos from "./TablaProductos"
import { errorPop, loadingPop, successPop } from "../../Hooks/util/messages/alerts"
import useForm from "antd/lib/form/hooks/useForm"
/* import FormBusqueda from "./formBusqueda/FormBusqueda" */
import ProductosModal from "./ProductosModal"
import ProductosFiltro from './ProductosFiltro'

const Productos = () => {

  const [form] = useForm()
  const [productoEdit, setProductoEdit] = useState([])
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  const [productoFilterDefault] = useState({})
  const [productoFilter, setProductoFilter] = useState(null)

  const [productos, errorObtenerProductos, obteniendoProductos, obtenerProductos] = useObtenerProductos()
  const [categorias, errorObtenerCategorias, obteniendoCategorias, obtenerCategorias] = useObtenerCategorias()

  const [productosBorrados, errorBorrarProductos, borrandoProductos, borrarProductos] = useBorradoMultipleProductos()

  const [productoEditado, errorEditarProducto, editandoProducto, editarProducto] = useEditarProducto()

  const [productoByCodigo, errorProductoByCodigo, obteniendoProductoByCodigo] = useObtenerProductoByCodigo()

  /* FETCHING DATOS */
  useEffect(() => { obteniendoProductos && loadingPop("Obteniendo Productos...", "productos") },  [obteniendoProductos]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => { obteniendoProductoByCodigo && loadingPop("Obteniendo Producto...", "producto") },  [obteniendoProductoByCodigo]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => { obteniendoCategorias && loadingPop("Obteniendo Categorias...", "categorias") },  [obteniendoCategorias]) // eslint-disable-next-line react-hooks/exhaustive-deps

  /* EDITADO */
  useEffect(() => { editandoProducto && loadingPop("Editando Producto...", "editando") },  [editandoProducto]) // eslint-disable-next-line react-hooks/exhaustive-deps
  
  useEffect(() => (productoEditado) && successPop(productoEditado?.msg, "editado"),  [productoEditado]) // eslint-disable-next-line react-hooks/exhaustive-deps

  /* BORRADO */
  useEffect(() => { borrandoProductos && loadingPop("Borrando Productos...", "borrando") },  [borrandoProductos]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => (productosBorrados) && successPop(productosBorrados?.msg, "borrado"),  [productosBorrados]) // eslint-disable-next-line react-hooks/exhaustive-deps

  /* OBTENCION DE ERRORES */
  useEffect(() => { errorObtenerCategorias && errorPop(errorObtenerCategorias?.message, "categorias") }, [errorObtenerCategorias])

  useEffect(() => { errorObtenerProductos && errorPop(errorObtenerProductos?.message, "productos") }, [errorObtenerProductos])

  useEffect(() => { errorBorrarProductos && errorPop(errorBorrarProductos?.message, "producto") }, [errorBorrarProductos])
 
  useEffect(() => { errorEditarProducto && errorPop(errorEditarProducto?.message, "producto") }, [errorEditarProducto])

  useEffect(() => { errorProductoByCodigo && errorPop(errorProductoByCodigo?.message, "producto") }, [errorProductoByCodigo])
  
  useEffect(() => { obtenerCategorias() }, [])

  useEffect(() => { productoFilter != null ? obtenerProductos(productoFilter) : obtenerProductos(productoFilterDefault)  }, [productoFilter,productoEditado, productosBorrados])

/*   const onGetByCode = (code) => {
     obtenerProductoByCodigo(code)
  } */

  const onBorrado = (productosIds) => {
    borrarProductos(productosIds)
  }

  const onGeneratePdf = async (productosIds) => {
     await genearReportePDFproductos(productosIds)
  }

  const onEdit = (productoEdit) => {
    editarProducto(productoEdit)
  }

  const onFiltrar = (filtro) => {
    setProductoFilter(filtro)
  }

  const onAdd = async (productoAdd) => {
     const request = await crearProducto(productoAdd)
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Listado de productos</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* <FormBusqueda
         onGetByCode={ onGetByCode }
      /> */}
      {
        visibleEdit &&
        <ProductosModal 
          form={ form }
          categorias={ categorias }
          productoEdit={ productoEdit }
          visible={ visibleEdit }
          setVisible={ setVisibleEdit }
          onSend={ onEdit }
          edit
        />
      }
      {
        visibleAdd &&
        <ProductosModal 
          form={ form }
          categorias={ categorias }
          productoEdit={ productoEdit }
          visible={ visibleAdd }
          setVisible={ setVisibleAdd }
          onSend={ onAdd }
          edit={ false }
        />
      }
      <ProductosFiltro
        obtenerProductos={ onFiltrar }
        categorias={ categorias }
      />
      <TablaProductos
         setVisibleAdd={ setVisibleAdd }
         setVisibleEdit={ setVisibleEdit }
         setProductoEdit={ setProductoEdit }
         categorias={ categorias }
         dataSourse={ productoByCodigo != undefined ? new Array(productoByCodigo) : productos }
         onBorrado={ onBorrado }
         onGeneratePdf={ onGeneratePdf }
         loading={ obteniendoProductos }
         isList
      />
    </>
  )
}

export default Productos