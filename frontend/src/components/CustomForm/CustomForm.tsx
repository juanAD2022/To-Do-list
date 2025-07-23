import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormValues } from "./model/form.model";
import  { schema } from "./model/form.model";
import InputForm from "./components/CustomInput";
import { useModalContext } from '../Modal/context/ModalContext';
import "./CustomInput.css"

export const CustomForm=()=>{
    const {setState} = useModalContext()
    const {control,handleSubmit,formState:{errors}}=useForm<FormValues>(
        {
            resolver:zodResolver(schema),
            mode:"onBlur",
            defaultValues:{
                name:"",
                description:"",
                check_task:false
            }
        }
    )

    const onSubimit:SubmitHandler<FormValues>=async(data)=>{
        console.log(data)
        const controller = new AbortController();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/task/", {
                method:"POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                signal: controller.signal,
            });

            if (!response.ok) {
            throw new Error("Error en la petición");
            }

        } catch (err: any) {
            if (err.name === 'AbortError') {
            console.log("Petición cancelada");
            } else {
            console.error("Error:", err);
            }
        }
        setState(false)
        return () => {
        controller.abort();
        };
    }

    return(
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubimit)}>
            <InputForm name="name" control={control} label="Name" type="text" error={errors.name}/>
            <InputForm name="description" control={control} label="Descripcion" type="text" error={errors.description}/>
            <InputForm name="check_task" control={control} label="Estado" type="checkbox" error={errors.check_task}/>
            <button type="submit" 
                className="text-white bg-blue-700 
                    hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm w-full 
                    sm:w-auto px-5 py-2.5 text-center 
                    dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800">Enviar</button>
        </form>
    )
}

