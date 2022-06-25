import React, {useEffect, useState} from 'react';
import './App.css';
// import {AddButton} from "./components/common/AddButton/AddButton";
// import AddItemForm from "./components/common/AddItemForm/AddItemForm";
import EditableSpan from "./components/common/EditableSpan/EditableSpan";
import {ToDoList} from "./components/ToDoList/ToDoList";
import {todolistAPI, ToDoListType} from "./DAL/todolistAPI";
import {useDispatch, useSelector} from "react-redux";
import {getAllToDoListsTC} from "./BLL/thunkCreators";
import {AppStoreType} from "./BLL/store";


function App() {
    //const[spanName, setSpanName] = useState<string>('span name')
    const todoLists = useSelector<AppStoreType, ToDoListType[]>(state => state.toDoLists)
    const dispatch = useDispatch<any>()
    useEffect(() => {
        dispatch(getAllToDoListsTC())
    }, [])
    return (
        <div className="App">
            app
            {/*<AddItemForm cb={console.log}/>
            <AddButton callback={()=>{}}/>*/}

            {/* <EditableSpan title={spanName} updateTitleOfItem={(e)=>setSpanName(e)}/>*/}
            {todoLists.length && <ToDoList tdlId={'ssss'}/>}

        </div>
    );
}

export default App;
