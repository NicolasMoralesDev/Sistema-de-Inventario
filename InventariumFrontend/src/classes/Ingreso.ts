import { Producto } from "./Producto"
import { Provedor } from "./Provedor"

export class Ingreso {
    id : Number
    observacion : String
    proveedor : Provedor
    usuario : String
    productos : Producto[]
    fechaIngreso : Date
    saldado : Boolean
 }