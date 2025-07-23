import {z} from "zod"

export const shemaEdit=z.object({
    name:z.string().min(1,"Nombre de la tarea"),
    description:z.string().min(1,"Descricion obligatori"),
})