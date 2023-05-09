import {createContext, useContext, useState} from 'react'


export const ServicesContext=createContext()

export const context=()=>{
    const Context=useContext(ServicesContext)
    if(!Context){
        throw new Error ("contexto fallando")
    }
    return Context
}

export const ServicesContextProvider=({children})=>{

    const [data2, setdata] = useState([])
    const [counter, setCounter] = useState(0)


    return(
        <ServicesContext.Provider value={{data2, setdata,setCounter,counter}}>
            {children}
        </ServicesContext.Provider>
    )

}