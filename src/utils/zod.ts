import { object, string } from "zod"
 
export const logInSchema = object({
  emailDni: string({ required_error: "Email o DNI es requerido" })
    .min(1, "Email o DNI es requerido")
    .email("Email inválido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener no más de 32 caracteres"),
})

export const registerSchema = object({
  name: string({required_error: 'El NOMBRE es requerido'})
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: string({required_error: 'El APELLIDO debe tener al menos 3 caracteres'})
    .min(3, "El APELLIDO es requerido"),
  emailDni: string({ required_error: "Email o DNI es requerido" })
    .min(1, "Email o DNI es requerido")
    .email("Email inválido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener no más de 32 caracteres"),
})