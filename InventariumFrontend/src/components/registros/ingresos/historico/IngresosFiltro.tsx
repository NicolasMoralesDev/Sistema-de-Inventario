import React from "react";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import { Provedor } from "../../../../classes/Provedor";

const IngresosFiltro = ({ obtenerIngresos, provedores }) => {
  const [form] = useForm();

  const handleFinish = (data) => {
    console.log(data);
  };

  return (
    <>
      <Card className="bg-slate-200">
        <Card title="Filtro de Ingresos">
          <Form
            form={form}
            name="basic"
            onFinish={() =>
              form
                .validateFields()
                .then(() => handleFinish(form.getFieldsValue()))
                .catch(() => {})
            }
          >
            <Row gutter={[22, 22]}>
              <Col span={5}>
                <Form.Item label="Fecha" name="fecha">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Usuario" name="usuario">
                  <Input
                    allowClear
                    placeholder="Usuario registrador del ingreso"
                  />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Proveedor" name="proveedor">
                  <Input allowClear placeholder="Proveedor del ingreso" />
                  <Select
                    options={ provedores?.map((provedor: Provedor) => ({
                      key: provedor.id,
                      label: provedor.nombre,
                      value: provedor.id,
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
