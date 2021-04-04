import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Navbar from './components/navbar/Navbar'
import Feed from './components/feed/Feed'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/feed' exact component={Feed} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
