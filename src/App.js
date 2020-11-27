import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import TransactionHistory from './TransactionHistory';
import Users from './Users';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
}
from 'react-router-dom';

class App extends React.Component{

  render(){
    return (
      <BrowserRouter >
        <div className="App">
          <Switch>
            <Route path="/" exact={true}>
                <Login />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/history">
                <TransactionHistory />
            </Route>
            <Route path="/users">
                <Users />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;