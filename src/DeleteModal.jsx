import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";



export default function DeleteModal (props) {

    const toggle = () => {
        props.setOpenDeleteModal(!props.openDeleteModal)
    }

    const deleteTask = () => {
        props.deleteTask(props.task._id)
        toggle()
    }

    return (
        <div>
            <Modal isOpen={props.openDeleteModal} modalTransition={{ timeout: 100 }} backdropTransition={{ timeout: 500 }}
                   toggle={toggle} >
                <ModalHeader toggle={toggle}>Delete this Task?</ModalHeader>
                <ModalBody>
                    {props.task.name} <hr />
                    {props.task.description}

                </ModalBody>
                <ModalFooter>
                    <Button onClick={deleteTask} color="danger" >DELETE</Button>{'  '}
                    <Button color="info" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
