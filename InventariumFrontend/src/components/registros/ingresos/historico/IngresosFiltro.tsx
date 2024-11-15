import React, { useEffect } from "react"
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd"
import useForm from "antd/lib/form/hooks/useForm"
import { Provedor } from "../../../../classes/Provedor"
import { FECHA_FORMATO_BARRAS } from "../../../../constants/fechasFarmatos"
import { errorPop, loadingPop } from "../../../../Hooks/util/messages/alerts"
import { useObtenerProveedores } from "../../../../Hooks/fetch/Provedores.hook"
import dayjs from "dayjs"
import { useObtenerUsuarios } from "../../../../Hooks/fetch/Usuarios.hook"
import { Usuario } from "../../../../classes/Usuario"

const IngresosFiltro = ({ obtenerIngresos }) => {
  const [form] = useForm()

  const [proveedores, errorObtenerProveedores, obteniendoProveedores, obtenerProveedores] = useObtenerProveedores()

  const [usuarios, errorObtenerUsuarios, obteniendoUsuarios, obtenerUsuarios] = useObtenerUsuarios()

  /* useEffect(() => { obteniendoUsuarios && loadingPop("Obteniendo Usuarios...", "usuarios") },  [obteniendoUsuarios]) */ // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => { errorObtenerUsuarios && errorPop(errorObtenerUsuarios?.message, "usuarios") }, [errorObtenerUsuarios])

  useEffect(() => { obtenerUsuarios() }, [])
  useEffect(() => { obtenerProveedores() },  [])

  useEffect(() => { obteniendoProveedores && loadingPop("Obteniendo Proveedores...", "proveedores") },  [obteniendoProveedores]) // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleFinish = (data) => {
    obtenerIngresos(data)
  }

  return (
    <>
      <Card className="bg-slate-200">
        <Card title="Filtro de Ingresos">
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
                    options={ usuarios?.map((usuario: Usuario) => ({
                      key: usuario.dni,
                      label: usuario.nombreCompleto,
                      value: usuario.nombreCompleto,
                    })) }
                  />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Proveedor" name="proveedor">
                  <Select
                    allowClear
                    placeholder="seleccione"
                    options={ proveedores?.map((proveedor: Provedor) => ({
                      key: proveedor.id,
                      label: proveedor.nombre,
                      value: proveedor.nombre,
                    })) }
                  />
                </Form.Item>
              </Col>
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

export default IngresosFiltro;
