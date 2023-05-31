import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import ChatApp from './chatapp';
import Design from './designs';
import SignIn from './signin';
import SignUp from './signup';


function App() {
  return (
      <Router>
           <Routes>
                 <Route exact path='/signup' element={< SignUp />}></Route>
                 <Route exact path='/' element={< SignIn />}></Route>
                 <Route exact path='/chatapp' element={< ChatApp />}></Route>
                 <Route exact path='/design' element={< Design />}></Route>
          </Routes>
       </Router>
  );
}

export default App;
