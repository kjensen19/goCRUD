import * as React from 'react';
import axios from 'axios';


//MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import './TaskCard.css'
import TaskDetail from '../TaskDetail/TaskDetail';



// const testConn = () => {
//     axios({
//       method: 'GET',
//       url: 'http://localhost:8080/tasks'
//     }).then((res) => {
//       console.log('res', res.data)
//       setTaskList(res.data)
//     }).catch((err) => {
//       console.log('GET err: ', err)
//     })
    
//   }


// &tas.ID, &tas.Name, &tas.Description, &tas.Assigned, &tas.Status
export default function TaskCard({ task }) {
    // const delTask = () =>
    //     axios.delete(`http://localhost:8080/tasks/${task.id}`)
    const delTask = () => {
        console.log('task.id=', task.id)
        const id = task.id
        axios({
            method: 'DELETE',
            url: `http://localhost:8080/tasks/${id}`
        }).then((res) => {
            console.log('delete successful', res)
        }).catch((err) => {
            console.log('DEL ERROR: ', err)
        })
    }
  return (
    <Card className='taskCard' sx={{ minWidth: 175, maxHeight: 110, borderRadius: 4, mb: 1, mt: 1 }}>
      <CardContent sx={{ pb: .2 }}>
        <Typography variant="h5" component="div" >
            {task.name}
        </Typography>
        <Typography sx={{ fontSize: 16, mt: 0}}  color="text.secondary">
          {task.assigned}
        </Typography>
      </CardContent>
      <CardActions sx={{pt: 0, paddingBottom: 3, ml: 1.25 }}>
        <Button size="small" variant='contained' >EDIT</Button>
        <Button size="small" variant='contained' onClick={delTask}>DEL</Button>
      </CardActions>
    </Card>
  );
}


