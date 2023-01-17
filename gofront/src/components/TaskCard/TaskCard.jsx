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
import TaskDetail from '../TaskDetail/TaskDetail';






// ID, Name, Description, Assigned, Status
// TODO: Add Avatar/img to task.name display
// TODO: Add edit to popup card detail component (modal?) with populated, editable fields
export default function TaskCard({ task, testConn }) {
    
    const delTask = () => {
        const id = task.id
        axios({
            method: 'DELETE',
            url: `http://localhost:8080/tasks/${id}`
        }).then((res) => {
            console.log('delete successful', res)
            testConn()
        }).catch((err) => {
            console.log('DEL ERROR: ', err)
        })
    }
  return (
    <Card className='taskCard' 
        sx={{ 
            minWidth: 175, 
            maxHeight: 125, 
            borderRadius: 4, 
            mb: 1, 
            mt: 1, 
            display: 'flex', 
            flexFlow: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
            }}>
        <TaskSorter task={task} testConn={testConn} />
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


