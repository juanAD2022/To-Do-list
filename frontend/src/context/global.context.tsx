import { createContext, useContext, useState, type ReactNode } from "react";

interface GlobalTask {
  id: number;
  name: string;
  description: string;
  check_task: boolean;
}
interface GlobalTaskContextType {
  value:GlobalTask,
  setValue:React.Dispatch<React.SetStateAction<GlobalTask>>,
}

export const GlobalContextTask = createContext<GlobalTaskContextType>({
  value:{
    id: -1,
    name: "",
    description: "",
    check_task: false,
  },
  setValue:()=>{}
})

export const ProviderTask=({children}:{children:ReactNode})=>{
  const [value,setValue]=useState<GlobalTask>({
    id: -1,
    name: "",
    description: "",
    check_task: false,
  })
  return <GlobalContextTask.Provider value={{value,setValue}}>{children}</GlobalContextTask.Provider>
}

export const useGlobalContextTask=()=>{
  const context = useContext(GlobalContextTask)
  if(!context){
    throw new Error("Se esta utilizando el contexto fuera de su proveedor")
  }
  return context
}