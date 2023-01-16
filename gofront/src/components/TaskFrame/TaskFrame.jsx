import * as React from 'react';
import Paper from '@mui/material/Paper';
import './TaskFrame.css'

import TaskCard from '../TaskCard/TaskCard';

export default function TaskFrame({ taskList }) {
    return (
        <Paper className='taskFrame' elevation={10} sx={{ padding: 1 }}>
            {taskList && taskList.map((task,i) =>(
            <TaskCard task={task} key={task.name} />
            ))}
        </Paper>
    )
}