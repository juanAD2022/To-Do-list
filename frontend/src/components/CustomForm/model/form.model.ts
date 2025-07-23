import {z} from "zod"

export const schema=z.object({
    name:z.string().min(1,"Nombre de la tarea"),
    description:z.string().min(1,"description obligatoria"),
    check_task:z.boolean().check(),
})

export type FormValues=z.infer<typeof schema>;