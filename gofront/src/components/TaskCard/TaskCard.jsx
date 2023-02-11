import * as React from 'react';
import axios from 'axios';


//MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import './TaskCard.css'
import TaskSorter from '../TaskSorter/TaskSorter';
// import TaskDetail from '../TaskDetail/TaskDetail';


// ID, Name, Description, Assigned, Status
// TODO: Add Avatar/img to task.name display
// TODO: Add edit to popup card detail component (modal?) with populated, editable fields
// TODO: Add detail view on click
// Receives one task from map function
// TODO: Could move some of the card styling to the CSS file to make card jsx more readable
export default function TaskCard({ task, fetchTasks }) {
    //Send ID of specific task with delete route on click, then call get function passed in as a prop
    const delTask = () => {
        const id = task.id
        axios({
            method: 'DELETE',
            url: `http://localhost:8080/tasks/${id}`
        }).then((res) => {
            fetchTasks()
        }).catch((err) => {
            alert('Error deleting task')
            console.log('DEL ERROR: ', err)
        })
    }
  return (
    <Card className='taskCard' 
        sx={{ 
            minWidth: 175, 
            maxHeight: 125, 
            borderRadius: 4, 
            mb: 2, 
            mt: 1, 
            display: 'flex', 
            flexFlow: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: ".25rem .25rem .25rem .25rem darkgrey" 
            }}>
        <TaskSorter task={task} fetchTasks={fetchTasks} />
        <CardContent sx={{padding: 0}}>
            <Typography variant="h5" component="div" >
                {task.name}
            </Typography>
            <Typography sx={{ fontSize: 16, mt: 0}}  color="text.secondary">
            {task.assigned}
            </Typography>
      </CardContent>
      <CardActions sx={{pt: 0, paddingBottom: 3, ml: 1.25}}>
        <Button size="small" variant='contained' >EDIT</Button>
        <Button size="small" variant='contained' onClick={delTask}>DEL</Button>
      </CardActions>
    </Card>
  );
}

//Pass task as a prop to the sorter component which determines which buttons to render at the top of the card (and handles functionality)


