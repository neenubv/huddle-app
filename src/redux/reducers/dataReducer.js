import { LOADING_DATA, SET_YELP_SUGGESTIONS } from '../types';

const initialState = {
    loadingData: false,
    attractions: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                loadingData: true,
                ...action.payload
            }
        case SET_YELP_SUGGESTIONS:
             console.log("YELP SUGGESTION....." + JSON.stringify(action.payload));
            return {
                loadingData: false,
                attractions: action.payload,
                ...action.payload
            }
        default:
            return state;
    }
}