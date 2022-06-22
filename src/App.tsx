import React, {useEffect} from 'react';
import './App.css';
import {tasksAPI} from "./DAL/tasksAPI";
import {todolistAPI} from "./DAL/todolistAPI";


function App() {
    useEffect(() => {
        /*todolistAPI.getToDoLists()
            .then(console.log)*/
        tasksAPI.getTasks("6e913c7e-ece9-490c-94cd-aadcc5cc55bb")
            .then(console.log)
    }, [])

    return (
        <div className="App">
            app
        </div>
    );
}

export default App;
