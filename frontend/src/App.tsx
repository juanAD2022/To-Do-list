import { useEffect, useState } from 'react';
import './App.css';
import { Table, Modal,CustomForm,CustomFormEdit} from './components';
import { useModalContext } from './components/Modal/context/ModalContext';
import {useGlobalContextTask} from "./context/global.context"

interface Task {
  id: number;
  name: string;
  description: string;
  check_task: boolean;
  create_at: string;
}

function App() {
  const {state,setState} = useModalContext()
  const {value,setValue}=useGlobalContextTask()
  const [viewModal, setViewModal] = useState(false);
  const [data, setData] = useState<Task[]>([]);

  const handbleClickDelete=async(id: string | number)=>{
    const controller = new AbortController();
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/task/${id}/`, {
            method:"DELETE",
            headers: {
            "Content-Type": "application/json",
            },
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
  const handbleClick=(id: string | number)=>{
    const task = data.find(item => item.id === id);
    if (task) {
      console.log("-------", task);
      setValue(task);
    }
    setViewModal(false)
    setState(true)
  }
  const handbleClickModal=()=>{
    setViewModal(true)
    setState(true)
  }
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/task/", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData: Task[] = await response.json();
        console.log(jsonData);
        jsonData.map((task,index)=>(
          jsonData[index].create_at=new Date(task.create_at).toLocaleDateString()
        ))
        setData(jsonData);

      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log("Petición cancelada");
        } else {
          console.error("Error:", err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [state]);

  useEffect(() => {
    console.log("Nuevo value del contexto:", value);
  }, [value]);

  return (
    <>
      <Modal>
        {viewModal ? <CustomForm/>:<CustomFormEdit/>}
      </Modal>
      {data ? (
        <>
        <div>
          <Table<Task>
            headers={["ID", "Nombre", "Descripción", "Estado", "Creación"]}
            fields={["id", "name", "description", "check_task", "create_at"]}
            data={data}
            getKey={(task) => task.id}
            parentMethod={handbleClick} 
            parentMethodDelete={handbleClickDelete}
            />
        </div>
        <button onClick={handbleClickModal}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
            me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none 
            dark:focus:ring-blue-800'>crear</button>
        {/* <div className='relative overflow-x-auto'>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Id</th>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Descripción</th>
                <th scope="col" className="px-6 py-3">Creación</th>
                <th scope="col" className="px-6 py-3">Estado</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((task) => (
                <tr key={task.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{task.id}</td>
                  <td className="px-6 py-4">{task.name}</td>
                  <td className="px-6 py-4">{task.description}</td>
                  <td className="px-6 py-4">{task.create_at}</td>
                  <td className="px-6 py-4">{task.check_task ? "✔️ Completado" : "⏳ Pendiente"}</td>
                  <td className="px-6 py-4">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        </>
      ) : (
        <p>Cargando tareas...</p>
        
      )}
    </>
  );
}

export default App;
