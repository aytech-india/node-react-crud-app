import './App.css';
import Login from './Auth/Login';
import { Route, Routes } from 'react-router-dom';
import List from './Dashboard/List';
import AddUser from './Dashboard/AddUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/login' element={<Login></Login>}></Route>
        <Route exact path='/dashboard' element={<List></List>}></Route>
        <Route exact path='/add-user' element={<AddUser />}></Route>
        <Route exact path='/update-user' element={<AddUser />}></Route>

      </Routes>
    </div>
  );
}

export default App;
