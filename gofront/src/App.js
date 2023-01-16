import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import TaskFrame from './components/TaskFrame/TaskFrame';
import TaskCard from './components/TaskCard/TaskCard';
import Paper from '@mui/material/Paper';



function App() {
  const [taskList, setTaskList] = useState('')

  useEffect(() => {
    testConn()
  }, [])
  //Currently passed via prop drilling. May a place to try useContext or implement redux w/sagas
  // TODO: add AddTask box
  // TODO: DnD
  // TODO: Login
  // TODO: 
  const testConn = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/tasks'
    }).then((res) => {
      console.log('res', res.data)
      setTaskList(res.data)
    }).catch((err) => {
      console.log('GET err: ', err)
    })
    
  }


  return (
    <div className="App">
      <header className="App-header">
        <TaskFrame taskList={taskList} testConn={testConn}/>       
      </header>
    </div>
  );
}

export default App;
