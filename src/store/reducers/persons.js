import * as actionTypes from '../actions/actionTypes';

const initialState = {
    persons: [],
    queryParams: {
        sortDirection: 'asc',
        sortBy: 'name',
        name: '',
        ageFrom: '',
        ageTo: '',
        relationshipStatus: ''
    },
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PERSON:
            return {
                ...state,
                persons: [...state.persons, action.person]
            }
        case actionTypes.SET_PERSONS:
            return {
                ...state,
                persons: action.personsArr
            }
        case actionTypes.SET_QUERY_PARAMS:
            return {
                ...state,
                queryParams: action.queryParams
            }
        case actionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }

}

export default reducer;