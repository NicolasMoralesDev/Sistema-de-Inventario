
import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { useObtenerCategorias } from "../../Hooks/fetch/Categorias.hook"
import { borradoMultipleProductos, crearProducto, genearReportePDFproductos, useEditarProducto, useObtenerProductoByCodigo, useObtenerProductos } from "../../Hooks/fetch/Productos.hook"
import TablaProductos from "./TablaProductos"
import { errorPop, loadingPop, successPop } from "../../Hooks/util/messages/alerts"
import useForm from "antd/lib/form/hooks/useForm"
import FormBusqueda from "./formBusqueda/FormBusqueda"
import ProductosModal from "./ProductosModal"
import ProductosFiltro from './ProductosFiltro'

const Productos = () => {

  const [form] = useForm()
  const [productoEdit, setProductoEdit] = useState([])
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  const [productoFilterDefault, setProductoFilterDefault] = useState({"nombre": "",
                                                                      "codigo": "",
                                                                      "precio": "",
                                                                      "marca": "",
                                                                    })
  const [productoFilter, setProductoFilter] = useState(null)

  const [productos, errorObtenerProductos, obteniendoProductos, obtenerProductos] = useObtenerProductos()
  const [categorias, errorObtenerCategorias, obteniendoCategorias, obtenerCategorias] = useObtenerCategorias()

  const [productoEditado, errorEditarProducto, editandoProducto, editarProducto] = useEditarProducto()

  const [productoByCodigo, errorProductoByCodigo, obteniendoProductoByCodigo, obtenerProductoByCodigo] = useObtenerProductoByCodigo()

  useEffect(() => { obteniendoProductos && loadingPop("Obteniendo Productos...", "productos") },  [obteniendoProductos]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => { obteniendoProductoByCodigo && loadingPop("Obteniendo Producto...", "producto") },  [obteniendoProductoByCodigo]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => { editandoProducto && loadingPop("Editando Producto...", "producto") },  [editandoProducto]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => (productoEditado) && successPop(productoEditado?.msg, "producto"),  [productoEditado]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => { obteniendoCategorias && loadingPop("Obteniendo Categorias...", "categorias") },  [obteniendoCategorias]) // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => { errorObtenerCategorias && errorPop(errorObtenerCategorias?.message, "categorias") }, [errorObtenerCategorias])

  useEffect(() => { errorObtenerProductos && errorPop(errorObtenerProductos?.message, "productos") }, [errorObtenerProductos])

  useEffect(() => { errorEditarProducto && errorPop(errorEditarProducto?.message, "producto") }, [errorEditarProducto])

  useEffect(() => { errorProductoByCodigo && errorPop(errorProductoByCodigo?.message, "producto") }, [errorProductoByCodigo])
  
  useEffect(() => { if(productoEditado) { obtenerProductos() } }, [productoEditado])

  useEffect(() => { obtenerCategorias() }, [])

  useEffect(() => { productoFilter != null ? obtenerProductos(productoFilter) : obtenerProductos(productoFilterDefault)  }, [productoFilter])

  const onGetByCode = (code) => {
     obtenerProductoByCodigo(code)
  }

  const onBorrado = async (productosIds) => {
     const request = await borradoMultipleProductos(productosIds)
  }

  const onGeneratePdf = async (productosIds) => {
    await genearReportePDFproductos(productosIds)
  }

  const onEdit = (productoEdit) => {
    editarProducto(productoEdit)
  }

  const onFiltrar = (filtro) => {
    setProductoFilter(filtro)
    console.log(filtro);
    
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
          edit={ true }
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