import {STATION_SELECT, STATION_DETAIL} from "../actions/action-types";

const defaultState = {
    station: undefined,
    liveDetails: undefined
}

export default function selectedStation(state = defaultState, action) {
    switch (action.type) {
        case STATION_SELECT:
            return {...state, station: action.station};
        case STATION_DETAIL:
            return {...state, liveDetails: action.station};
        default:
            return state
    }
}
