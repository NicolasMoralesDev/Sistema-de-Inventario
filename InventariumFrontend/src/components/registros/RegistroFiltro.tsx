import React, { useEffect } from "react"
import { Button, Card, Col, DatePicker, Form, Row, Select } from "antd"
import useForm from "antd/lib/form/hooks/useForm"
import dayjs from "dayjs"
import { useObtenerUsuarios } from "../../Hooks/fetch/Usuarios.hook"
import { useObtenerProveedores } from "../../Hooks/fetch/Provedores.hook"
import { errorPop } from "../../Hooks/util/messages/alerts"
import { FECHA_FORMATO_BARRAS } from "../../constants/fechasFarmatos"

interface RegistroFiltro {
  obtenerIngresos : Function;
  isIngreso? : boolean;
}

const RegistroFiltro = ({ obtenerIngresos, isIngreso } : RegistroFiltro) => {
  const [form] = useForm()

  const [proveedores, errorObtenerProveedores, obteniendoProveedores, obtenerProveedores] = useObtenerProveedores()

  const [usuarios, errorObtenerUsuarios, obteniendoUsuarios, obtenerUsuarios] = useObtenerUsuarios()

  useEffect(() => { errorObtenerUsuarios && errorPop(errorObtenerUsuarios?.message, "usuarios") }, [errorObtenerUsuarios])

  useEffect(() => { obtenerUsuarios() }, [])
  useEffect(() => { obtenerProveedores() },  [])

  const handleFinish = (data) => {
    obtenerIngresos(data)
  }

  return (
    <>
      <Card className="bg-slate-200">
        <Card title={ isIngreso ? "Filtro de Ingresos" : "Filtro de Egresos" }>
          <Form
            form={ form }
            name="basic"
            onFinish={ () =>
              form
                .validateFields()
                .then(() => handleFinish(form.getFieldsValue()))
                .catch(() => {})
            }
          >
            <Row gutter={ [22, 22] }>
              <Col span={ 5 }>
                <Form.Item label="Fecha" name="fecha" className="w-full">
                  <DatePicker 
                    allowClear 
                    maxDate={ dayjs(FECHA_FORMATO_BARRAS) }
                    format={ {
                      format: FECHA_FORMATO_BARRAS
                      } }/>
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Usuario" name="usuario">
                 <Select
                    allowClear
                    placeholder="seleccione"
                    options={ usuarios?.map((usuario) => ({
                      key: usuario.dni,
                      label: usuario.nombreCompleto,
                      value: usuario.nombreCompleto,
                    })) }
                  />
                </Form.Item>
              </Col>
              { isIngreso &&
              <Col span={ 5 }>
                <Form.Item label="Proveedor" name="proveedor">
                  <Select
                    allowClear
                    placeholder="seleccione"
                    options={ proveedores?.map((proveedor) => ({
                      key: proveedor.id,
                      label: proveedor.nombre,
                      value: proveedor.nombre,
                    })) }
                  />
                </Form.Item>
              </Col>
              }
            </Row>
            <Row>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="btn-cyan-custom bg-cyan-900 text-white"
                >
                  Filtrar
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Card>
      </Card>
    </>
  );
};

export default RegistroFiltro;
