import React, {useEffect} from 'react';
import './App.css';
import {todolistAPI} from "./DAL/todolistAPI";

function App() {
    useEffect(()=>{
        //todolistAPI.updateToDoListTitle('3e8e30e0-393c-4008-a133-65fc4a3ba818', 'firstable')
        todolistAPI.getToDoLists()
            .then((res)=>{
                console.log(res)
            })
    }, [])

  return (
    <div className="App">
    app
    </div>
  );
}

export default App;
