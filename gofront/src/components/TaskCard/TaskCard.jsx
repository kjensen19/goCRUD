import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './TaskCard.css'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
// &tas.ID, &tas.Name, &tas.Description, &tas.Assigned, &tas.Status
export default function TaskCard({ task }) {
  return (
    <Card className='taskCard' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Task: {task.status}
        </Typography>
        <Typography variant="h5" component="div">
            {task.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {task.assigned}
        </Typography>
        <Typography variant="body2">
            {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}