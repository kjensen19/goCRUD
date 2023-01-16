import * as React from 'react';
import Paper from '@mui/material/Paper';

import TaskCard from '../TaskCard/TaskCard';

export default function TaskFrame({ task }) {
    return (
        <Paper elevation={10} sx={{ padding: 1 }}>
            <TaskCard task={task} />
        </Paper>
    )
}