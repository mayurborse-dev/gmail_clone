import React, { useEffect } from 'react';
import Header from './Components/Header/Header';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Mail from './Components/Mail/Mail';
import EmailList from './Components/EmailList/EmailList';
import SendMail from './Components/SendMail/SendMail'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, selectUser } from './features/userSlice';
import Login from './Components/Login/Login'
import { auth } from './Components/Firebase/Firebase';

function App() {
  const sendMessageIsOpen =useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        }))
      } 
    })
  },[])

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
        <Header />
        <div className='app__body'>
          <Sidebar />
          <Routes>
            <Route path='/mail' element={<Mail />}/>
            <Route path='/' element={<EmailList />}/>
          </Routes>
        </div>
        {sendMessageIsOpen && <SendMail />} 
      </div>
      )}
    </Router>
  );
}

export default App;
