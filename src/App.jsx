import { useEffect, useState } from 'react'
import './App.css'
import Task from "./components/Task"
import axios from "axios"
import { v4 as uuid } from 'uuid';

const API_URL = import.meta.env.VITE_DB_API_URL


function App() {
  //generate user id
  if (!localStorage.getItem("oldUser")){
    localStorage.setItem("userId", uuid())
    localStorage.setItem("oldUser", true)
  }
  //console.log(localStorage.getItem("userId"))

  //{_id:5,userId:0,text:"my task",complete:false, timestamp:12}
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("")


  function updateTaskList(){
    axios.get(API_URL+`/tasks/${localStorage.getItem("userId")}`)
    .then(res =>{setTasks(res.data)})
  }

  async function deleteTask(id){
    await axios.delete(API_URL+`/tasks/delete/${id}`)
    updateTaskList()
  }

  async function completeTask(id){
    await axios.get(API_URL+`/tasks/complete/${id}`)
  }

  async function createTask(text){

    if (text.trim() === ""){
      return
    }

    const taskData ={
      userId:localStorage.getItem("userId"),
      text:text,
      complete: false,
      timestamp: Date.now()
    } 
    await axios.post(API_URL+"/tasks/create", taskData)
    updateTaskList()
  }

  async function clearTasks(){
    tasks.map(task=>{deleteTask(task._id)})

  }
  

  useEffect(updateTaskList, [])

  

  return (
    <div className="App">
      

      <div className='task-app'>
        <h1>Task app</h1>

        <div className='input-field'>
          <input type="text" placeholder="Task text"  onChange={e=>setTaskText(e.target.value)}/>
          <button onClick={()=>{createTask(taskText)}}><i className="fa-solid fa-plus"></i></button>
        </div>

        <div className="task-list">
        
        {tasks.sort((a,b)=>b.timestamp-a.timestamp).map((task)=>
          <Task 
          key={task._id} 
          id = {task._id} 
          text={task.text} 
          timestamp = {task.timestamp}
          complete={task.complete}
          delFun = {deleteTask}
          compFun = {completeTask}
          />
        )}
        </div>
        
        <div className='footer'>
          <span>You have {tasks.length} tasks</span>
          <button onClick={clearTasks}>Clear tasks</button>
        </div>


      </div>

      
      
      
    </div>
  )
}

export default App
