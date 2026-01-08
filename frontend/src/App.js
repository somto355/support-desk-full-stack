import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import  Tickets  from './pages/Tickets';
import Ticket from './pages/Ticket';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
                    <Header />
        <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />

  {/* PROTECTED ROUTES */}
  <Route element={<PrivateRoute />}>
    <Route path='/tickets' element={<Tickets />} />
    <Route path='/ticket/:ticketId' element={<Ticket />} />
    <Route path='/new-ticket' element={<NewTicket />} />
  </Route>
</Routes>
        </div>
      </Router>
            <ToastContainer />


    </>
  );
}


export default App;



