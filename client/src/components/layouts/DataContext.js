import React, {createContext, useState, useContext, useEffect} from 'react'
// create a context from shared data 
const  DataContext = createContext()
//Dataprovider componets  to managed shared state
export const DataProvider = ({children})=>{
    // State shared data 
    const [shareData, setShareData] = useState(null)
    const [toteluser , settotelUSer] = useState(null)
    const [toteltour, setTotalTour] = useState(null)
    //funcation to update shared data
    const UpdateSharedData = (data)=>{
        setShareData(data)
    };
    const UpdatetotalUserData = (data)=>{
        settotelUSer(data)
    }
    const Update_Total_Tour = (data)=>{
        setTotalTour(data)
    }
   
    //provider shared data and update  funcation to context
    return(
        <DataContext.Provider value={{shareData, UpdateSharedData,toteluser,
        UpdatetotalUserData,toteltour,Update_Total_Tour}}>
            {children}
        </DataContext.Provider>
    );
};
//custome hook to access the shared data and update funcation
export const useData = ()=>{
    const context = useContext(DataContext)
    if(!context){
        throw new Error("useData must be used in the DataProvider")
    }
    return context;
}