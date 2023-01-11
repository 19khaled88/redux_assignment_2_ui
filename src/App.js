import {Route, Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Regiser';
import Signin from './components/Signin';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route path='/login' element={<Signin />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
