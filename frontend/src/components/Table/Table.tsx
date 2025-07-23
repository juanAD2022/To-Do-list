interface Props<T> {
    headers:string[];
    fields: (keyof T)[];
    data:T[];
    getKey: (item: T) => string | number;
    parentMethod:(id: string | number)=>void;
    parentMethodDelete:(id: string | number)=>void;
}

export const Table =<T,>({headers,fields,data,getKey,parentMethod,parentMethodDelete}:Props<T>)=>{
    return(
        <div className='relative overflow-x-auto'>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {headers.map((header,index)=>(
                    <th key={index} scope="col" className="px-6 py-3">
                        {header}
                    </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={getKey(item)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        {fields.map((field,index)=>(
                            <td key={index} className="px-6 py-4">
                                {typeof item[field] === "boolean"
                                    ?(item[field]?"✅ Completado" : "⏳ Pendiente"):String(item[field])
                                }
                            </td>
                        ))}
                        <td className="px-6 py-4">
                            <button type="button" onClick={()=>parentMethod(getKey(item))} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
                        </td>
                        <td className="px-6 py-4">
                            <button type="button" onClick={()=>parentMethodDelete(getKey(item))} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
    )
}
