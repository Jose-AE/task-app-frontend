import { useState } from "react";
import "../css/Task.css"


export default function Task(props){
    const [complete, setComplete] = useState(props.complete)



    return(
        <>
        <div className="task-container">
            <p className={complete?"task-text complete":"task-text"} onClick={()=>{setComplete(!complete);props.compFun(props.id)}}>
            {props.text}
            
            </p>
            
            <i onClick={()=>{props.delFun(props.id)}} className="fa-solid fa-xmark"></i>
            
        </div>

        </>
    );
}