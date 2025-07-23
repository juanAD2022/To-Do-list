import type { Control,FieldError } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { FormValues } from "../model/form.model";

interface Props {
    name: keyof FormValues;
    control:Control<FormValues>;
    label:string;
    type?:string;
    error?:FieldError;
}

const InputForm = ({name,control,label,type,error}:Props)=>{
    return (
        <div className="form-group mb-5">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <Controller
            name={name}
            control={control}
            render={({ field }) => (
                type === "checkbox" ? (
                <input
                    id={name}
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                />
                ) : (
                <input
                    id={name}
                    type={type}
                    {...field}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                />
                )
            )}
            />

            {error && <p className="error">{error.message}</p>}
        </div>
    )
}

export default InputForm