import * as React from 'react';
//MUI
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import './TaskFrame.css'

//Components
import TaskCard from '../TaskCard/TaskCard';

// TODO: Add 



export default function TaskFrame({ taskList, fetchTasks }) {
    const toDo = [] 
    const doing = []
    const done = []
    const taskCollection = [toDo, doing, done]
    //This will eventually be replaced with a call to the boards specific task classifications(board info table or
    //board table depending)
    const taskHeaderArray = ['ToDo', 'Doing', 'Done']

    //Switch to sort tasks based on status
    for (let task of taskList){
        switch(task.status){
            case 'ToDo':
                 toDo.push(task)
                break;
            case 'Doing':
                doing.push(task)
                break;
            case 'Done':
                done.push(task)
                break;
            default:
     
        }

    }
    
    //✅TODO: Move taskFrame sx to CSS file (DRY)
    // ✅TODO: look at writing all of this as a function that creates each column based on cards?
        //~11 lines instead of 25
    // ✅uses MUI stack to hold the three groups and provide styling

    return (
        <Stack direction='row' spacing={3} >
        {taskCollection && taskCollection.map((taskArr, i) =>(
            <Paper className='taskFrame' key={taskHeaderArray[i]} elevation={1} sx={{ padding: 1, backgroundColor: 'grey', borderRadius: 4, minHeight: 500 }}>
                <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
                   {taskHeaderArray[i]}
                </Typography>
            {taskArr.map((task, i) =>(
                <TaskCard task={task} fetchTasks={fetchTasks} key={task.name} />
            ))}
            </Paper>
        ))}
        </Stack>


    )
}

/* <Stack direction='row' spacing={3} >
<Paper className='taskFrame' elevation={1} sx={{ padding: 1, backgroundColor: 'grey', borderRadius: 4, minHeight: 500 }}>
    <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
        ToDo
    </Typography>
    {toDo && toDo.map((task,i) =>(
    <TaskCard task={task} fetchTasks={fetchTasks} key={task.name} />
    ))}
</Paper>
<Paper className='taskFrame' elevation={1} sx={{ padding: 1, backgroundColor: 'grey', borderRadius: 4, minWidth: 200 }}>
    <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
        Doing
    </Typography>
    {doing && doing.map((task,i) =>(
    <TaskCard task={task} fetchTasks={fetchTasks} key={task.name} />
    ))}
</Paper>
<Paper className='taskFrame' elevation={1} sx={{ padding: 1, backgroundColor: 'grey', borderRadius: 4, minWidth: 200 }}>
    <Typography variant="h5" component="div" sx={{color: 'ghostwhite'}}>
        Done
    </Typography>
    {done && done.map((task,i) =>(
    <TaskCard task={task} fetchTasks={fetchTasks} key={task.name} />
    ))}
</Paper>
</Stack> */