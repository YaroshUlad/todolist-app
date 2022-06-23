import React, {useEffect} from 'react';
import './App.css';
import {AddButton} from "./components/common/AddButton/AddButton";
import AddItemForm from "./components/common/AddItemForm/AddItemForm";





function App() {
    useEffect(() => {
        /*todolistAPI.getToDoLists()
            .then(console.log)*/
       // tasksAPI.getTasks("6e913c7e-ece9-490c-94cd-aadcc5cc55bb")
           // .then(res=> console.log(res))
    }, [])

 //   const dispatch = useDispatch()
    //dispatch(getTasksForToDoListTC('sss'))
    return (
        <div className="App">
            app
            <AddItemForm cb={console.log}/>

            <AddButton callback={()=>{}}/>
        </div>
    );
}

export default App;
