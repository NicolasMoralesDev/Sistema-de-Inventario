import React from "react";
import { Button, Card, Col, Form, Input, InputNumber, Row } from "antd"
import useForm from "antd/lib/form/hooks/useForm"

const ProductosFiltro = ({ obtenerProductos }) => {
  const [form] = useForm()

  const handleFinish = (data) => {
    obtenerProductos(data)
  }

  return (
    <>
      <Card className="bg-slate-200">
        <Card title="Filtro de Productos:">
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
                <Form.Item label="Nombre" name="nombre" >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Marca" name="marca" >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Precio" name="precio" >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Codigo" name="codigo de barras" >
                  <Input allowClear/>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item>
                <Button htmlType="submit" className="btn-cyan-custom bg-cyan-900 text-white">Filtrar</Button>
              </Form.Item>
            </Row>
          </Form>
        </Card>
      </Card>
    </>
  );
};

export default ProductosFiltro;
