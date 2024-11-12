import { Rol } from "./Rol"

export class Usuario {
    username : String 
    nombreCompleto : String 
    dni : Number
    roles : Rol[]
    enabled : boolean 
}