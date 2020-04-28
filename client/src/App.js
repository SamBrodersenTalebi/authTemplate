import React, { useState } from 'react';
import loginService from './services/login';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [formDataLogin, setFormDataLogin] = useState({
    password: '',
    email: '',
  });

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = formDataLogin;
    console.log('hello');
    try {
      const user = await loginService.login({ email, password });
      console.log(user);
      //save user to local storage:
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      //user is object with token, name and success status
      setUser(user);
      setFormDataLogin({
        password: '',
        email: '',
      });
      setMessage('Login Sucessfull' + 'Welcome' + user.name);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage('Invalid user or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log(error);
    }
  };

  const loginChange = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Landing />
          </Route>
          <Route path='/login'>
            <Login
              password={formDataLogin.password}
              email={formDataLogin.email}
              onSubmit={login}
              handleChange={loginChange}
            />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/dashboard'>
            {user ? <Dashboard /> : <Redirect to='/login' />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
