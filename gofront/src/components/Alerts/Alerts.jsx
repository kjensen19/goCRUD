import Alert from '@mui/material/Alert';


export default function Alerts({ setShowAlert }){
    return(
        <Alert onClose={() => {}} onClick={() => {setShowAlert(false)}} severity="error">This is an error alert — check it out!</Alert>
    )
}
