import React, { useState } from "react" 
import { Button, Popconfirm, Space, Table } from "antd" 
import { DeleteFilled, EditOutlined } from "@ant-design/icons" 
import { defaultPagination } from "../../../Hooks/util/DefaultPagination" 
import { usePermission } from "../../../Hooks/util/auth.hook" 
import { ROLE_DUENIO } from "../../../constants/permisos" 
import { Provedor } from "../../../classes/Provedor" 

const TablaProvedores = (props) => {

  const { dataSourse, setVisibleEdit, borrarProvedores, setProvedorEditar } = props

  const isAdmin = usePermission(ROLE_DUENIO)

  const [provedoresSeleccionados, setProvedoresSeleccionados] = useState([])
  const onSelectProvedores = (provedorSelected) => {
    setProvedoresSeleccionados(provedorSelected)
  }

  const isDisabled = () => {
    if (provedoresSeleccionados.length > 0) {
       return true 
    } else {
       return false
    }
  }
  
  const onDelete = () => {
    borrarProvedores(provedoresSeleccionados)
  }

  const onEdit = (provedor) => {
    setProvedorEditar(provedor)
    setVisibleEdit(true)
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      width: "30%",
      key: 'nombre',
      render: (nombre) => <h6 className="font-normal">{ nombre }</h6>
    },
    { 
      title: 'Correo',
      dataIndex: 'correo',
      width: "20%",
      key: 'correo',
      render: (correo) => <h6 className="font-normal">{ correo }</h6>
    },
    { 
      title: 'Telefono',
      dataIndex: 'tel',
      width: "15%",
      key: 'tel',
      render: (tel) => <h6 className="font-normal">{ tel }</h6>
    },
    {
      title: 'Acciones',
      width: "15%",
      key: 'acciones',
      render: (ingreso) => <>
          <Button title="Editar Registro" disabled={ !isAdmin }  onClick={ () => onEdit(ingreso) } className="bg-cyan-950 btn-cyan-custom text-white">Editar <EditOutlined/></Button>
      </>
    },
  ] 

  return (
    <>
      <Space className="flex w-full justify-end">
      <Popconfirm
          title="Borrar provedores"
          description="¿Esta seguro que desea borrar?"
          onConfirm={ onDelete }
          okText="borrar"
          cancelText="cancelar"
        >
         <Button className="bg-red-800 text-white" type="primary" disabled={ isDisabled() ? false : true } icon={ <DeleteFilled/> } >Borrado multiple</Button>
        </Popconfirm>
      </Space>
      <Table
        size="small"
        bordered={ true }
        className="overflow-x-scroll"
        rowKey={ (provedor) => provedor.id }
        dataSource={ dataSourse }
        columns={ columns }
        pagination={ defaultPagination(dataSourse, 10) }
        rowSelection={ !isAdmin ? {} : {
          selectedRowKeys: provedoresSeleccionados,
          onChange: onSelectProvedores,
        } }
        locale={ {
          emptyText: "No se encontraron provedores"
        } }
      />
    </>
  )
}

export default TablaProvedores