import './App.css'

// Replace your code here

import {Component} from 'react'
import {Route, Switch} from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import LeaderBoard from './components/LeaderBoard'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/leaderboard" component={LeaderBoard} />
        <Route exact path="/register" component={Register}/>
      </Switch>
    )
  }
}

export default App

