import React, { useState } from "react";
import {addItem} from '../actions/listAction';
import {useDispatch} from 'react-redux';
function TodoForm(props){
    const dispatch = useDispatch()
    const [text, setText] = useState("");
  

    function handleChange(event){
        let texto = event.target.value;
        setText(texto);
    }

    function additemEvent(event){
        event.preventDefault();
        if(text){
        // setItems([...items, text];
        dispatch(addItem(text));
        setText("");
       }
    }
    return(
    
    <form className="tasksForm">
            <input  onChange={handleChange} type="text" value={text}></input>
            <button className={props.theme ? "dark" : ""} onClick={additemEvent}>+</button>
        </form>
)
}

export default TodoForm