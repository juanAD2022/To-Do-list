import { createContext, useContext, useState } from "react";
import  type {ReactNode }from "react";
const ModalContext = createContext<{
    state:boolean;
    setState:React.Dispatch<React.SetStateAction<boolean>>;
}>({
    state:false,
    setState:()=>null
})

export const ModalProvider =({children}:{children: ReactNode})=>{
    const [state,setState]=useState<boolean>(false)
    return <ModalContext.Provider value={{state,setState}}>{children}</ModalContext.Provider>
}

export const useModalContext=()=>{
    const context = useContext(ModalContext);
    if(!context){
        throw new Error("El modal se está utilizando fuera de su proveedor.")
    }
    return context
}