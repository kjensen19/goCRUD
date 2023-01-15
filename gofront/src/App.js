import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
  const [taskList, setTaskList] = useState('')
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
        <button onClick={testConn}>?????</button>
        <ul>
          {taskList && taskList.map((task,i) =>(
            <li key={i}>{[task.name, task.description, task.assigned, task.status]}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
