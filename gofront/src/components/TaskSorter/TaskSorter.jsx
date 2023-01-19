import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function TaskSorter({ task, fetchTasks }) {
    //Arr of all possible status tags
    const statusArr = ['ToDo', 'Doing', 'Done']
    //Arr of the statuses that need to appear on the card as buttons (starts empty)
    const buttonArr = []
    //Loop through statusArr and check against task.status to exclude that option and push the others to the button array
    for (let stat of statusArr) {
        if (stat === task.status){
            continue
        }
        else{
            buttonArr.push(stat)
        }
    }
    //On click that calls a PUT, uses the text content of the button to determine where to move the card and then rerenders based on GET
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
            fetchTasks()
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
//Object Shape:
// ID, Name, Description, Assigned, Status