import React, { useState, useEffect } from "react";
import List from "./components/List";
import Header from "./components/Header"
import TodoForm from "./components/TodoForm";
import Modal from "./components/Modal";
// import Theme from "./components/Theme";
import './Todo.css'

import { createStore } from 'redux';
import { Provider } from "react-redux";
import listReducer from "./reducer/listReducer";
const SAVED_ITEMS = "savedItems"


function persistState(state){
    localStorage.setItem(SAVED_ITEMS, JSON.stringify(state))
}
function loadState(){
    const actualState = localStorage.getItem(SAVED_ITEMS)
    if(actualState){
        return JSON.parse(actualState)
    }else{
        return [];
    }
}
const store = createStore(listReducer, loadState())
store.subscribe(()=>{
    persistState(store.getState());
})
function App(){
const [showModal, setShowModal] = useState(false)
const [theme, setTheme] = useState(false);

useEffect(()=>{
    setTheme(JSON.parse(localStorage.getItem('@todolist:theme')));
},[]) 

useEffect(()=>{
localStorage.setItem('@todolist:theme', JSON.stringify(theme));
},[theme])

// function onAddItem(text){
//     let item = new Item(text);
//  setItems([...items, item])
// }
// function onItemDeleted(item){
//     let filteredItems = items.filter(it=>it.id != item.id)
//     setItems(filteredItems)
// }
// function onDone(item){
//     let updatedItems = items.map(it=>{
//         if(it.id == item.id){
//             it.done = !it.done;
//         } 
//         return it;
//     }) 
//     setItems(updatedItems);
// }
function onHandleTheme() {
    setTheme(!theme);
}
function onHideModal(e){
    setShowModal(false)
        }
    return (
        <main className={theme ? "main dark" : "main"}>
            
            <Header theme={theme} onHandleTheme={onHandleTheme}/>
            <div className="content">
            <Provider store={store}>
           <h1>My Tasks</h1>
        <TodoForm></TodoForm>
        <List></List>
       <Modal show={showModal} onHideModal={onHideModal}>
        <TodoForm  onHideModal={onHideModal}></TodoForm></Modal>
        </Provider>
       </div>
       
       </main>
    )
    }




export default App;