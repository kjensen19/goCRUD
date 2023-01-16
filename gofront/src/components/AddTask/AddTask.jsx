import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
//MUI
import  Stack  from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


// Name, Description, Assigned, Status
export default function AddTask({ testConn }) {
    const [newTask, setNewTask] = useState({name:'', description:'', assigned:'', status:''})

    const handleChange = e => {
        const { name, value } = e.target;
        setNewTask(newTask => ({
            ...newTask,
            [name]: value
        }))
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewTask(newTask)
    }
    const emptyInputs = () =>{useState({name:'', description:'', assigned:'', status:''})}

    const addNewTask = (task) => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/tasks',
            data: {
                name: task.name,
                description: task.description,
                assigned: task.assigned,
                status: task.status
            }
        }).then((res) => {
            testConn()
            emptyInputs()
        }).catch((err) => {
            console.log('POST err: ', err)
        })
    }
    // Name, Description, Assigned, Status
    return (
        <Stack>
            <Input onChange={handleChange} type="text" name='name' placeholder='Name' value={newTask.name} />
            <Input onChange={handleChange} type="text" name='description' placeholder='Description' value={newTask.description} />
            <Input onChange={handleChange} type="text" name='assigned' placeholder='Assigned' value={newTask.assigned} />
            <Input onChange={handleChange} type="text" name='status' placeholder='Status' value={newTask.status} />
            <Button onClick={handleSubmit}>Add Task</Button>
        </Stack>
    )
}