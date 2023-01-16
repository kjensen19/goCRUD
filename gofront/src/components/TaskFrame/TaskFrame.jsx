import * as React from 'react';
import { useState } from 'react';
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
    const toDo = [] 
    const doing = []
    const done = []

    for (let task of taskList){
        console.log('task',task, 'task.status:', task.status)
        switch(task.status){
            case 'ToDo':
                console.log('in toDo????????????')
                 toDo.push(task)
                break;
            case 'Doing':
                console.log('DOING *****************')
                doing.push(task)
                break;
            case 'Done':
                console.log('DONE DONE DONE DONE DONE')
                done.push(task)
                break;
            default:
                console.log('task.status =', task.status)
                console.log('task in default: ', task)
        }
        console.log('TODO::::::::::', toDo)
        console.log('DOING!!!!!!!!!!!!!!!!!!!', doing)
        console.log('DONE XXXXXXXXXXXXXXX', done)
    }

    return (
        <Stack direction='row' spacing={3} >
            <Paper className='taskFrame' elevation={1} sx={{ padding: 2, backgroundColor: 'grey', borderRadius: 4 }}>
                <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
                    ToDo
                </Typography>
                {toDo && toDo.map((task,i) =>(
                <TaskCard task={task} key={task.name} />
                ))}
            </Paper>
            <Paper className='taskFrame' elevation={1} sx={{ padding: 2, backgroundColor: 'grey', borderRadius: 4, minWidth: 200 }}>
                <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
                    Doing
                </Typography>
                {doing && doing.map((task,i) =>(
                <TaskCard task={task} key={task.name} />
                ))}
            </Paper>
            <Paper className='taskFrame' elevation={1} sx={{ padding: 2, backgroundColor: 'grey', borderRadius: 4, minWidth: 200 }}>
                <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
                    Done
                </Typography>
                {done && done.map((task,i) =>(
                <TaskCard task={task} key={task.name} />
                ))}
            </Paper>
        </Stack>


    )
}