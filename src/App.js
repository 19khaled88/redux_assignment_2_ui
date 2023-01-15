import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';

import About from './components/pages/About';
import Dashboard from './components/pages/Dashboard';
import Comment from './components/pages/Comment';
import Analytics from './components/pages/Analytics';

import Register from './components/Regiser';
import Signin from './components/Signin';
import Sidebar from './components/Sidebar';
import User from './components/pages/User';
import Welcome from './components/Welcome';
import LoginAs from './components/LoginAs';
import Employee from './components/Employee';
import Employer from './components/Employer';
import EmployeeDetails from './components/EmployeeDetails';


function App() {
 
  return (
    <div className="App">
        <Navbar />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Signin />} />
            <Route path='/loginas' element={<LoginAs />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/sidebar' element={<Sidebar />}/>
            <Route path="/user" element={<User />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/comment" element={<Comment />}/>
            <Route path="/about" element={<About />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/empDetails" element={<EmployeeDetails />} />
          </Routes>
    </div>
  );
}

export default App;
