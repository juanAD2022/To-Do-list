import { useRef } from "react"
import { createPortal } from "react-dom"
import {useModalContext} from "./context/ModalContext"
interface Props {
    children:React.ReactNode
}

export const Modal =({children}:Props)=>{
    const modalRef = useRef<HTMLDivElement>(null)
    const {state,setState}=useModalContext();
    
    const closeModal = ()=>{setState(false)}

    const modalRoot = document.getElementById("modal")
    
    if (!state || !modalRoot){
        return null;
    }

    return createPortal(
        <div id="static-modal" data-modal-backdrop="static"  aria-hidden="true" 
            className="
                flex
                fixed top-0 left-0 right-0 bottom-0 z-50
                justify-center items-center
                w-full h-full
                bg-opacity-50  
                overflow-y-auto overflow-x-hidden" 
            >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200" ref={modalRef}>
                        <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    )

}