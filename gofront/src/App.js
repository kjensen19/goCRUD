import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

//Components
import AddTask from './components/AddTask/AddTask';
import TaskFrame from './components/TaskFrame/TaskFrame';



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
        ToDo
      </header>
      <TaskFrame taskList={taskList} testConn={testConn}/>
      <AddTask testConn={testConn} />   
    </div>
  );
}

export default App;
