import React from 'react';
import Task from "./Task";
import EditModal from "./EditModal";

function Column(props) {
    return (
        <div className='col-sm'>

        <h2>{props.status}</h2>
            {props.tasks.filter(el => el.status === props.status).sort((a, b) => b.priority - a.priority).map(el => <Task
                task={el}
                key={el._id}
                moving={props.moving}
                statuses={props.statuses}
                priorities={props.priorities}
                editTask={props.editTask}
                deleteTask={props.deleteTask}
            /> )}
        </div>
    );
}

export default Column;
