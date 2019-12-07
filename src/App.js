import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import createTrip from './pages/createTrip';
import inviteFriends from './pages/inviteFriends';
import addUserPreference from './pages/addUserPreference';
import attractions from './pages/searchAttractions';
import scheduleTrip from './pages/scheduleTrip';
import GoogleMap from './components/GoogleMap';
import MapView from './components/MapView';
import tripDetails from './pages/tripDetails';
import huddleboard from './pages/huddleboard';
import finalizeDestination from './pages/finalizeDestination';
import itinerary from './pages/itinerary';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login}/>
                <AuthRoute exact path="/signup" component={signup}/>
                <Route exact path="/createTrip" component={createTrip} />
                <Route exact path="/addUserPreference" component={addUserPreference} />
                <Route exact path="/inviteFriends" component={inviteFriends} />
                <Route exact path="/lookupAttractions" component={attractions} />
                <Route exact path="/scheduleTrip" component={scheduleTrip} />
                <Route exact path="/getDirections" component={MapView} />
                <Route exact path="/tripDetails" component={tripDetails} />
                <Route exact path="/finalizeDestination" component={finalizeDestination} />
                <Route exact path="/huddleBoard" component={huddleboard} />
                <Route exact path="/itinerary" component={itinerary} />
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;