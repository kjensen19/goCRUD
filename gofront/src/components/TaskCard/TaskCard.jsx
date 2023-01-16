import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './TaskCard.css'
import TaskDetail from '../TaskDetail/TaskDetail';



// &tas.ID, &tas.Name, &tas.Description, &tas.Assigned, &tas.Status
export default function TaskCard({ task }) {
  return (
    <Card className='taskCard' sx={{ minWidth: 175, maxHeight: 110, borderRadius: 4, mb: 1, mt: 1 }}>
      <CardContent sx={{ pb: .2 }}>
        <Typography variant="h5" component="div" >
            {task.name}
        </Typography>
        <Typography sx={{ fontSize: 12, mt: .5}}  color="text.secondary">
          {task.assigned}
        </Typography>
      </CardContent>
      <CardActions sx={{pt: 0, paddingBottom: 3, ml: 1.25 }}>
        <Button size="small" variant='contained' >EDIT</Button>
        <Button size="small" variant='contained' >DEL</Button>
      </CardActions>
    </Card>
  );
}



{/* <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
Task: {task.status}
</Typography> */}
{/* <Typography variant="body2">
{task.description}
</Typography> */}