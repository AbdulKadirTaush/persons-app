import * as actionTypes from './actionTypes';
import axios from '../../instances/axios-persons';

const API_PATH = '/api/persons';

const setPerson = (person) => {
    return {
        type: actionTypes.SET_PERSON,
        person: person
    }
}

const setIsLoading = (isLoading) => {
    return {
        type: actionTypes.SET_IS_LOADING,
        isLoading: isLoading
    }
}

const setPersons = (personsArr) => {
    return {
        type: actionTypes.SET_PERSONS,
        personsArr: personsArr
    }
}

const setParams = (queryParams) => {
    return {
        type: actionTypes.SET_QUERY_PARAMS,
        queryParams: queryParams
    }
}

export const dispatchPerson = (reqBody) => {
    return (dispatch, getStore) => {
        dispatch(setIsLoading(true))
        axios.post(API_PATH, reqBody)
            .then(res => {
                dispatch(setPerson(res.data));
                dispatch(setIsLoading(false));
                dispatch(dispatchPersons(getStore().persons.queryParams))
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export const dispatchPersons = (params) => {
    return dispatch => {
        const query = API_PATH + `?nameContains=${params.name}&ageFrom=${params.ageFrom}&ageTo=${params.ageTo}&relationshipStatusEquals=${params.relationshipStatus}&sortBy=${params.sortBy}&sortDirection=${params.sortDirection}`;
        
        axios.get(query)
            .then(res => {
                dispatch(setPersons(res.data));
                dispatch(setParams(params));
            })
            .catch(err => {
                console.error(err);
            })
    }
}
