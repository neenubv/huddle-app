import { SET_YELP_SUGGESTIONS, FAIL_YELP_SUGGESTIONS } from '../types';
import axios from 'axios';

export const getYelpSuggestions = (searchData) => (dispatch) => {
    const {term, location } = searchData;
    console.log("TERM : " + term + " Location: " + location);
    const token = 'tccb3Q2HyjSDclK-RV2b1xSf2vRKGYwyV9QwyOXW-igSayT0rS3kQf-RmOMvfRlEr4f1VhxtDg8M14n0hUZDP-43ymnfpjhJaFpyYTP5TZuwyZqttoU20YTYx-unXXYx';
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(`/attractions?term=${term}&location=${location}`, config)
        .then(res => {
            dispatch({
                type: SET_YELP_SUGGESTIONS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: FAIL_YELP_SUGGESTIONS,
                payload: err.response.data
            })
        });

}