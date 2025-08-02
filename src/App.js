
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Sudokugame from './Components/Sudokugame';
import Userprof from './Components/Userprof';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home"  element={<Home/>}/>
      <Route path="/game" element={<Sudokugame/>}/>
      <Route path="/profile" element={<Userprof/>}/>

    </Routes>
  );
};

export default App;
