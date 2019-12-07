import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/login', userData)
             .then(res => {
                setAuthorizationToken(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push("/");
             })
             .catch(err => {
                 dispatch({
                     type: SET_ERRORS,
                     payload: err.response.data
                 })
             })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/signup', newUserData)
             .then(res => {
                setAuthorizationToken(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push("/");
             })
             .catch(err => {
                 dispatch({
                     type: SET_ERRORS,
                     payload: err.response.data
                 })
             })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
         .then(res => {
             dispatch({
                 type: SET_USER,
                 payload: res.data
             })
         })
         .catch(err => console.log(err));
}

const setAuthorizationToken = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const createUserTrip = (tripData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/trip', tripData)
             .then(res => {
                console.log("TRIP DATA ---> " + JSON.stringify(tripData))
                localStorage.setItem('tripId', res.data.TripId);
                dispatch({ type: CLEAR_ERRORS });
                history.push("/addUserPreference");
             })
             .catch(err => {
                 dispatch({
                     type: SET_ERRORS,
                     payload: err.response.data
                 })
             })
}

export const addPreference = (userPreference, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    var tripId = localStorage.getItem('tripId');
    axios.post(`/preference?tripId=${tripId}`, userPreference)
             .then(res => {
                dispatch({ type: CLEAR_ERRORS });
                history.push("/inviteFriends");
             })
             .catch(err => {
                 dispatch({
                     type: SET_ERRORS,
                     payload: err.response.data
                 })
             })
}

export const inviteBuddies = (buddyData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    var tripId = localStorage.getItem('tripId');
    axios.post(`/inviteFriends?tripId=${tripId}`, buddyData)
             .then(res => {
                dispatch({ type: CLEAR_ERRORS });
                history.push("/finalizeDestination");
             })
             .catch(err => {
                 dispatch({
                     type: SET_ERRORS,
                     payload: err.response.data
                 })
             })
}

export const recommendAttractions = (attractions, history) => (dispatch) => {
    var tripId = localStorage.getItem('tripId');
    console.log("TRIP :: " + JSON.stringify(attractions))
    axios.post(`/attraction?tripId=${tripId}`, attractions)
             .then(res => {
                dispatch({ type: CLEAR_ERRORS });
                history.push("/scheduleTrip");
             })
             .catch(err => {
                 console.log(err)
                 dispatch({
                     type: SET_ERRORS,
                     payload: err.response.data
                 })
             })
}

export const scheduleAttractions = (schedule, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    var tripId = localStorage.getItem('tripId');
    console.log("SCHEDULE :: " + JSON.stringify(schedule));
    axios.post(`/scheduleTrip?tripId=${tripId}`, schedule)
             .then(res => {
                dispatch({ type: CLEAR_ERRORS });
                history.push("/getDirections");
             })
             .catch(err => {
                 dispatch({
                     type: SET_ERRORS,
                     payload: err.response.data
                 })
             })
}