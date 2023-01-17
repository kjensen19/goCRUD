import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function TaskSorter({ task, testConn }) {
    const statusArr = ['ToDo', 'Doing', 'Done']
    const buttonArr = []
    for (let stat of statusArr) {
        if (stat === task.status){
            continue
        }
        else{
            buttonArr.push(stat)
        }
        console.log('buttonArr', buttonArr)
    }

    const handleClick = (e) => {
        console.log(e.target.textContent)
        axios({
            method: 'PUT',
            url: `http://localhost:8080/tasks`,
            data: {
                id: task.id,
                name: task.name,
                description: task.description,
                assigned: task.assigned,
                status: e.target.textContent
            }
        }).then((res) => {
            testConn()
            console.log('res', res)
          }).catch((err) => {
            console.log('PUT err: ', err)
          })
    }
    return(
        <Stack direction='row' paddingTop={2.5} margin={0} >
            <Button onClick={handleClick} sx={{ paddingTop: 0}} size='small'>{buttonArr[0]}</Button>
            <Button onClick={handleClick} sx={{ paddingTop: 0}} size='small'>{buttonArr[1]}</Button>
        </Stack>
    )
}
// ID, Name, Description, Assigned, Status