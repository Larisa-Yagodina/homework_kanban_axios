import React, {useState} from 'react';
import {Input, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";



export default function CreateModal (props) {

    const toggle = () => {
        props.setOpenEditMode(!props.openEditMode)
    }

    const [newName, setNewName] = useState(props.task.name)
    const [newDescription, setNewDescription] = useState(props.task.description)
    const [newStatus, setNewStatus] = useState(props.task.status)
    const [newPriority, setNewPriority] = useState(props.task.priorities)

    const edit = () => {
        props.editTask(props.task._id, {
            name: newName,
            description: newDescription,
            status: newStatus,
            priority: newPriority,
        })
        toggle()
    }

    return (
        <div>
            <Modal isOpen={props.openEditMode} modalTransition={{ timeout: 100 }} backdropTransition={{ timeout: 500 }}
                   toggle={toggle} >
                <ModalHeader toggle={toggle}>Create Task</ModalHeader>
                <ModalBody>
                    <label>Name: </label>
                    <Input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" placeholder="name of the task" />

                    <label>Description: </label>
                    <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} type="text" placeholder="description of the task" />

                    <label>Status: </label>
                    <Input value={newStatus} onChange={(e) => setNewStatus(e.target.value)} type="select" name="select">
                        {props.statuses.map(el => <option value={el} key={Math.random()}>{el}</option>)}
                    </Input>

                    <label>Priority: </label>
                    <Input value={newPriority} onChange={(e) => setNewPriority(e.target.value)} type="select" name="select">
                        {props.priorities.map(el => <option value={el} key={Math.random()}>{el}</option>)}
                    </Input>

                </ModalBody>
                <ModalFooter>
                    <Button onClick={edit} color="warning" >SAVE</Button>{'  '}
                    <Button color="info" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
