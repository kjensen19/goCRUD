import * as React from 'react';
//MUI
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import './TaskFrame.css'

//Components
import TaskDetail from '../TaskDetail/TaskDetail';
import TaskCard from '../TaskCard/TaskCard';

// TODO: Add function to sort tasks based on status

export default function TaskFrame({ taskList }) {
    return (
        <Stack direction='row' spacing={3} >
            <Paper className='taskFrame' elevation={1} sx={{ padding: 2, backgroundColor: 'grey', borderRadius: 4 }}>
                <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
                    ToDo
                </Typography>
                {taskList && taskList.map((task,i) =>(
                <TaskCard task={task} key={task.name} />
                ))}
            </Paper>
            <Paper className='taskFrame' elevation={1} sx={{ padding: 2, backgroundColor: 'grey', borderRadius: 4, minWidth: 200 }}>
                <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
                    Doing
                </Typography>
            </Paper>
            <Paper className='taskFrame' elevation={1} sx={{ padding: 2, backgroundColor: 'grey', borderRadius: 4, minWidth: 200 }}>
                <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
                    Done
                </Typography>
            </Paper>
        </Stack>


    )
}