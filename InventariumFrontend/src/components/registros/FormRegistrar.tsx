import React, { useEffect }from 'react' 
import { Button, Card, Col, Input, InputNumber, Row, Select, Space, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import useForm  from "antd/lib/form/hooks/useForm"
import { BookOutlined, InboxOutlined, ProductFilled, ProductOutlined, UploadOutlined } from "@ant-design/icons" 
import { obtenerProductosStorage } from '../../Hooks/util/localStorage/Abm.registros' 
import { useGetNombreUsuario } from '../../Hooks/util/localStorage/Auth' 
import { useObtenerProductoByCodigo } from '../../Hooks/fetch/Productos.hook' 
import { usePermission } from '../../Hooks/util/auth.hook' 
import { ROLE_DUENIO } from '../../constants/permisos' 
import { Provedor } from '../../classes/Provedor' 
import { Categoria } from '../../classes/Categoria' 
import './estilos/formIngresos.css'

 interface FormRegistrar {
    provedores?: Provedor[] 
    categorias: Categoria[] 
    onSend: Function 
    onRegister: Function 
    isEgreso?: boolean 
    setVisibleProve?: Function 
    setVisibleProveReg?: Function 
 }

 const FormRegistrar = ({ onSend, provedores, categorias, onRegister, isEgreso, setVisibleProve, setVisibleProveReg }: FormRegistrar) => {

  const [form] = useForm()

  const isAdmin = usePermission(ROLE_DUENIO)

  const [producto, errorProductoByCodigo, obteniendoProductoByCodigo, obtenerProductoByCodigo] = useObtenerProductoByCodigo()

  const handleChange = (codigo) => {
    obtenerProductoByCodigo(codigo)
  }

  useEffect(() => { form.setFieldsValue({
      codigo: producto?.codigo ? producto?.codigo : "" ,
      nombre: producto?.nombre ? producto?.nombre : "",
      marca: producto?.marca ? producto?.marca : "",
      precio: producto?.precio ? producto?.precio : "",
      categoria: producto?.categoria ? producto?.categoria.id : "",
      descripcion: producto?.descripcion ? producto?.descripcion : "",
      cant: ""

  })}, [ producto ])
    
  const nombreUsuario = useGetNombreUsuario()

  const onSendEgreso = (values) => {

    const data = {
      usuario: nombreUsuario,
      codigo: values?.codigo,
      nombre: values?.nombre,
      marca: values?.marca,
      precio: values?.precio,
      cantidad: values?.cantidad,
      observacion: values?.observacion,
      categoria: { id:values?.categoria },
      descripcion: values?.descripcion
    }

     onSend(data)
     console.log('Success')   
  }

  const onSendIngreso = (values) => {

    const data = {
       usuario: nombreUsuario,
       codigo: values?.codigo,
       nombre: values?.nombre,
       marca: values?.marca,
       precio: values?.precio,
       cantidad: values?.cantidad,
       observacion: values?.observacion,
       provedor: values?.provedor,
       categoria: { id:values?.categoria },
       descripcion: values?.descripcion
    }

      onSend(data)
      console.log('Success')   
    
  }

  const onFinish = (values) => { 
    
    isEgreso ? onSendEgreso(values) : onSendIngreso(values) 
    form.setFieldsValue({
      id:"",
      usuario:"",
      codigo: "",
      nombre: "",
      marca: "",
      precio: "",
      cantidad: "",
      categoria: "",
      descripcion: ""
    })
  } 

  return (
    <>
      <Card className='bg-slate-200'>
        <Form
          form={ form }
          name="basic"
          onFinish={ onFinish }
          autoComplete="off"
        >
          <Card className="w-full">
            <Row gutter={ [50,20] }>
              <Col span={ 10 }>
                <Form.Item
                  label={ !isEgreso ? "Observación del Ingreso" : "Observación del Egreso" }
                  name="observacion"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese una observacion!',
                      transform: (value) => value.trim()
                    },
                  ]}
                >
                  <TextArea 
                      placeholder='Observacion del registro...'
                      autoSize={ { minRows: 5, maxRows: 10 } }
                      maxLength={ 500 }
                      showCount
                  />
                </Form.Item>
              </Col>
              { !isEgreso &&
              <>
              <Col span={ 24 } sm={ 6 }>
                <Form.Item
                  label="Proveedor"
                  name="provedor"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese una observacion!',
                    },
                  ]}
                >
                  <Select
                      options={ 
                        provedores?.map((provedor : Provedor ) => (
                            {
                              key: provedor.id,
                              label: provedor.nombre,
                              value: provedor.id
                            }
                        ))
                     } 
                  />
                </Form.Item>
              </Col>
              <Col>
                <Space align='start' className='flex flex-wrap justify-center md:flex-row sm:flex-col'>
                  <Button icon={ <BookOutlined /> } type='primary' onClick={ ()=> setVisibleProve(true) } className='btn-cyan-custom bg-blue-950 text-white' >Ver proveedores</Button>
                  <Button icon={ <InboxOutlined /> } disabled={ !isAdmin } type='primary' onClick={ ()=> setVisibleProveReg(true) } className='btn-cyan-custom bg-blue-950 text-white' >Registrar proveedor</Button>
                </Space>
              </Col>
              </>
              }
            </Row>
          </Card>
          <>
            <Card>
              <div className='m-5'>
                <h2>Agregar Productos:</h2>
              </div>
              <Row gutter={ [50,50] }>
                <Col span={ 5 }>
                 <Form.Item
                   label="Codigo de Barras"
                   name="codigo"
                   rules={[
                     {
                       required: true,
                       message: 'Ingrese el codigo!',
                     },
                   ]}
                  >
                  <InputNumber
                     className='w-10/12'
                     placeholder='Codigo de barras'
                     min={ 0 }
                     minLength={ 4 }
                     onChange={ handleChange }
                    />
                  </Form.Item>
                </Col>
                <Col span={ 5 }>
                 <Form.Item
                   label="Nombre"
                   name="nombre"
                   rules={[
                     {
                      required: true,
                      message: 'Ingrese el nombre del producto!',
                      transform: (value) => value.trim()
                     },
                   ]}
                 >
                  <Input 
                    disabled={ producto?.nombre || isEgreso ? true : false }
                    placeholder='Nombre'
                    allowClear
                  />
                </Form.Item>
                </Col>
                <Col span={ 5 }>
                <Form.Item
                  label="Marca"
                  name="marca"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese la marca del producto!',
                      transform: (value) => value.trim()
                    },
                  ]}
                >
                  <Input 
                    disabled={ producto?.marca || isEgreso ? true : false }
                    placeholder='Marca'
                  />
                </Form.Item>
                </Col>
                <Col>
                <Form.Item
                  label="Precio $"
                  name="precio"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese el precio del producto!',
                    },
                  ]}
                >
                  <InputNumber 
                    min={ 1 }
                    disabled={ producto?.precio || isEgreso ? true : false }
                    placeholder='Precio'
                  />
                </Form.Item>
                </Col>
                <Col>
                <Form.Item
                  label="Cantidad"
                  name="cantidad"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese la cantidad!',
                    },
                  ]}
                >
                  <InputNumber
                    min={ 1 }
                    max={ isEgreso ? (producto?.cantidad as number) : 2000 }
                    minLength={ 1 }
                    placeholder='Cantidad'
                  />
                </Form.Item>
                </Col>
              </Row>
              <Row gutter={ [55,15] }>
              <Col sm={ 10 } span={ 20 }>
                <Form.Item
                  label="Descripcion"
                  name="descripcion"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese una descripcion!',
                      transform: (value) => value.trim()
                    },
                  ]}
                >
                  <TextArea
                      disabled={ producto?.descripcion || isEgreso ? true : false }
                      autoSize={ { minRows: 5, maxRows: 10 } }
                      showCount
                      maxLength={ 200 }
                      placeholder='Descripcion'
                  />
                </Form.Item>
              </Col>
                <Col sm={ 5 } span={ 15 }>
                  <Form.Item
                    label="Categoria"
                    name="categoria"
                    rules={[
                      {
                        required: false,
                        message: 'Ingrese la categoria!',
                      },
                    ]}
                  >
                    <Select 
                        disabled={ producto?.categoria || isEgreso ? true : false }
                        options={ 
                          categorias?.map((categoria : Categoria ) => (
                              {
                                key: categoria.id,
                                label: categoria.titulo,
                                value: categoria.id
                              }
                          ))
                       } 
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </>
          <Space>
          <Form.Item className="m-3">
            <Button type="default" className='btn-cyan-custom bg-blue-950 text-white' htmlType="submit" icon={ <ProductOutlined/> }>
              Cargar producto
            </Button>
          </Form.Item>
            { !isEgreso ?
            <Button type="primary" className='bg-blue-950 text-white' disabled={ obtenerProductosStorage("productos") != null ? false : true } onClick={ ()=> onRegister() } icon={ <UploadOutlined/> }>
              Registrar ingreso
            </Button> 
            :
            <Button type="primary" className='bg-blue-950 text-white' disabled={ obtenerProductosStorage("productosEgresos") != null ? false : true } onClick={ ()=> onRegister() } icon={ <ProductFilled/> }>
              Registrar egreso
            </Button> 
            }
          </Space>
        </Form>
      </Card>
    </>
  )
}

export default FormRegistrar