import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
//MUI
import  Stack  from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


//OBJECT SHAPE: (ID), Name, Description, Assigned, Status
export default function AddTask({ fetchTasks }) {
    //Use variable for starting stay to keep reset DRY
    const baseState = {name:'', description:'', assigned:''}
    //State for task being created
    const [newTask, setNewTask] = useState(baseState)

    //change handler to manage task as an object w/spread operator keeping previous entries
    //name and value on inputs are important as they must match object for this function to work
    const handleChange = e => {
        const { name, value } = e.target;
        setNewTask(newTask => ({
            ...newTask,
            [name]: value
        }))
    };
    //Prevent default behavior of the submit, call axios POST on new task object
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewTask(newTask)
    }
    //Create function to empty the inputs
    const emptyInputs = () => {setNewTask(baseState)}
    //Call POST with new task object as data
    //On sucess call GET function (passed to component as a prop) to rerender the tasks with new task
    //Then call function to empty the inputs
    //TODO: add user notification (alert) in the catch block
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
            fetchTasks()
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
//If we want to add the ability to set status back in;
/* <Input onChange={handleChange} type="text" name='status' placeholder='Status'  value={newTask.status} /> */