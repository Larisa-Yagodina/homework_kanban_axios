import React, {useState} from 'react';
import {CardHeader, CardBody, Card, CardTitle, CardText, Button} from "reactstrap";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";


export default function Task(props) {

    const [openEditMode, setOpenEditMode] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    return (
        <div>
                <Card body outline color="info">
                    <CardHeader>{props.task.name}</CardHeader>
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardText>
                            {props.task.description} <hr/>
                            Priority: {props.task.priority}
                        </CardText>
                        <button disabled={props.statuses.indexOf(props.task.status) === 0 } onClick={() => props.moving(props.task._id, props.task.status, 'left')} type="button" className="btn btn-outline-info">←</button>
                        <button disabled={props.statuses.indexOf(props.task.status) === props.statuses.length - 1 } onClick={() => props.moving(props.task._id, props.task.status, 'right')} type="button" className="btn btn-outline-info">→</button> <br />
                        <button onClick={() => setOpenEditMode(true)} type="button" className="btn btn-outline-warning">Edit</button>
                        { openEditMode &&
                          <EditModal
                              openEditMode={openEditMode}
                              setOpenEditMode={setOpenEditMode}
                              task={props.task}
                              editTask={props.editTask}
                              statuses={props.statuses}
                              priorities={props.priorities}
                          />
                        }
                        <button onClick={() => setOpenDeleteModal(true)} type="button" className="btn btn-outline-danger">Delete</button>
                        {openDeleteModal &&
                           <DeleteModal
                               openDeleteModal={openDeleteModal}
                               setOpenDeleteModal={setOpenDeleteModal}
                               task={props.task}
                               deleteTask={props.deleteTask}
                           />
                        }
                    </CardBody>
                </Card>
            </div>
    );
}
