import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
//MUI
import  Stack  from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


// Name, Description, Assigned, Status
export default function AddTask({ testConn }) {
    const [newTask, setNewTask] = useState({name:'', description:'', assigned:''})

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
    const emptyInputs = () => {setNewTask({name:'', description:'', assigned:''})}

    const addNewTask = (task) => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/tasks',
            data: {
                name: task.name,
                description: task.description,
                assigned: task.assigned,
                status: "ToDo"
            }
        }).then((res) => {
            testConn()
            emptyInputs()
        }).catch((err) => {
            console.log('POST err: ', err)
        })
    }
    // Name, Description, Assigned, Status
    // Currently assumes that any task being added is ToDo, could easily add input but it seems more straightforward to use a default
    return (
        <Stack sx={{backgroundColor: 'ghostwhite', borderRadius: 4, padding: 1, width: 400, mt: 2 }}>
            <Input onChange={handleChange} type="text" name='name' placeholder='Name' color='secondary' required value={newTask.name} />
            <Input onChange={handleChange} type="text" name='description' placeholder='Description' required value={newTask.description} />
            <Input onChange={handleChange} type="text" name='assigned' placeholder='Assigned'  value={newTask.assigned} />
            <Button onClick={handleSubmit}>Add Task</Button>
        </Stack>
    )
}

/* <Input onChange={handleChange} type="text" name='status' placeholder='Status'  value={newTask.status} /> */