import React from "react";
import { Button, Card, Col, Form, Input, Row } from "antd"
import useForm from "antd/lib/form/hooks/useForm"

const ProductosFiltro = () => {
  const [form] = useForm();

  const onFinish = (data) => {
    console.log(data);
  };

  return (
    <>
      <Card className="bg-slate-200">
        <Form
          form={ form }
          name="basic"
          onFinish={ onFinish }
        >
          <Card>
            <Row gutter={ [22, 22] }>
              <Col span={5}>
                <Form.Item label="Nombre">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Marca">
                  <Input />
                </Form.Item>
              </Col>
                <Col span={ 5 }>
                <Form.Item label="Precio">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={ 5 }>
                <Form.Item label="Codigo">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
                <Button htmlType="submit">Filtrar</Button>
            </Row>
          </Card>
        </Form>
      </Card>
    </>
  );
};

export default ProductosFiltro;
