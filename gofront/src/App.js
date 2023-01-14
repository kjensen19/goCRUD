import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const testConn = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/tasks'
    }).then((res) => {
      console.log('res', res.data)
    }).catch((err) => {
      console.log('GET err: ', err)
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={testConn}>?????</button>
      </header>
    </div>
  );
}

export default App;
