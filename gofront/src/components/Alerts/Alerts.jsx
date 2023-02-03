import Alert from '@mui/material/Alert';

//Currently specific to the one isntance (post) but could add props to control type and text to make multi-functional
export default function Alerts({ setShowAlert }){
    return(
        <Alert onClose={() => {}} onClick={() => {setShowAlert(false)}} severity="error" variant='filled'>Add Task failed, please try again</Alert>
    )
}
