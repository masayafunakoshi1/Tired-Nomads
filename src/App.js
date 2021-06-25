import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider } from './Components/contexts/AuthContext';
import "./App.css"

import GoogleMapContainer from './Components/GoogleMapContainer';
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Privateroute from "./Components/Privateroute"
import GoogleMapsPersonal from './Components/Users/GoogleMapsPersonal';

const App = () => {

  useEffect(() => {
    document.title='Tired Nomads - A google maps app'
  }, [])

    return (
      <Router>
      <div className="App">
          <AuthProvider>
            <Switch>
              <Route exact path="/"component={GoogleMapContainer} />
              <Privateroute 
                exact path="/myMap" 
                component={GoogleMapsPersonal}
              />
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup} />
              {/* add private route for user's personal data */}
            </Switch>
          </AuthProvider>
      </div>
      </Router>
    );
  }


export default App;
