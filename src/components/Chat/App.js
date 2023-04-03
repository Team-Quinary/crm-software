import './Message_App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import Home from './Pages/Home';
// import Navbar from './Components/Navbar'
// import { Register } from './Pages/Register';
// import { Login } from './Pages/MsgLogin';
import  AuthProvider  from './context/auth';
// import PrivateRoute from './Components/PrivateRoutes';
// import Profile from './Pages/Profile';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/message" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      {/* <PrivateRoute component={<Home/>} path="/" exact /> */}
      
      </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
