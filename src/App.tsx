import React, {useState} from 'react';
import './App.css';
// import {AddButton} from "./components/common/AddButton/AddButton";
// import AddItemForm from "./components/common/AddItemForm/AddItemForm";
import EditableSpan from "./components/common/EditableSpan/EditableSpan";





function App() {
    const[spanName, setSpanName] = useState<string>('span name')

    return (
        <div className="App">
            app
            {/*<AddItemForm cb={console.log}/>
            <AddButton callback={()=>{}}/>*/}

            <EditableSpan title={spanName} updateTitleOfItem={(e)=>setSpanName(e)}/>
        </div>
    );
}

export default App;
