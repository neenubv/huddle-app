import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_YELP_SUGGESTIONS } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    details: {},
    trips: [],
    pendingJoin: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case SET_YELP_SUGGESTIONS:
            return {
                loading: false,
                ...action.payload
            }
        default:
            return state;
    }
}