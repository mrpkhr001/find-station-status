import {SEARCH_RESULT} from "../actions/action-types";

const defaultState = {
    searchResult: [],
}

export default function search(state = defaultState, action) {
    switch (action.type) {
        case SEARCH_RESULT:
            return {...state, searchResult: action.results};
        default:
            return state;
    }
}
