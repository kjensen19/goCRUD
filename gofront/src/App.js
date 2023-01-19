import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

//Components
import AddTask from './components/AddTask/AddTask';
import TaskFrame from './components/TaskFrame/TaskFrame';



function App() {
  //Manages task list for all components
  const [taskList, setTaskList] = useState('')

  
  //on page load call fetch
  useEffect(() => {
    fetchTasks()
  }, [])
  //Currently passed via prop drilling. May be a place to try useContext or implement redux w/sagas
  // ✅TODO: add AddTask box
  // TODO: DnD
  // TODO: Login
  // ✅TODO: Rename testConn as fetchTasks

  //GET for all components
  const fetchTasks = () => {
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
      <TaskFrame taskList={taskList} fetchTasks={fetchTasks}/>
      <AddTask fetchTasks={fetchTasks} />   
    </div>
  );
}

export default App;
