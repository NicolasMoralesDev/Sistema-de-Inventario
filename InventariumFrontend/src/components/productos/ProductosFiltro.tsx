import React, { useState } from "react"
import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import useForm from "antd/lib/form/hooks/useForm"
import { Categoria } from "../../classes/Categoria"

const ProductosFiltro = ({ obtenerProductos, categorias }) => {
  const [form] = useForm()
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const handleFinish = (data) => {
    obtenerProductos(data)
  }

  const handleInputChange = (changedValues) => {
    // Verifica si alguno de los valores ha cambiado
    const hasValue = Object.values(changedValues).some(value => value !== undefined && value !== '')
    setIsButtonEnabled(hasValue)
  }

  return (
    <>
      <Card className="bg-slate-200">
        <Card title="Filtro de Productos">
          <Form
            form={ form }
            name="basic"
            onValuesChange={ handleInputChange }
            onFinish={ () =>
              form
                .validateFields()
                .then(() => handleFinish(form.getFieldsValue()))
                .catch(() => {})
            }
          >
            <Row gutter={ [22, 22] }>
              <Col span={ 5 }>
                <Form.Item label="Nombre" name="nombre">
                  <Input allowClear placeholder="Nombre del producto" />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Categoria" name="categoria">
                  <Select
                    allowClear
                    options={ categorias?.map((categoria: Categoria) => ( {
                      key: categoria.titulo,
                      label: categoria.titulo,
                      value: categoria.titulo,
                    })) }
                  />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Marca" name="marca">
                  <Input allowClear placeholder="Marca del producto" />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Precio" name="precio">
                  <Input allowClear placeholder="Precio del producto" />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Codigo de barras" name="codigo">
                  <Input allowClear placeholder="Codigo del producto" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item>
                <Button
                  htmlType="submit"
                  disabled={ !isButtonEnabled }
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

export default ProductosFiltro;
