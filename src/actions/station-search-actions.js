import {SEARCH_RESULT, STATION_DETAIL, STATION_SELECT} from "./action-types";
import {fetchLiveStation, fetchStations} from "../services/station-finder-service";

export function findMatchingStations(searchText, cancelExecutor) {
    return async dispatch => {
        const matchingResult = await fetchStations(searchText, cancelExecutor);
        if (matchingResult) {
            dispatch({
                type: SEARCH_RESULT,
                results: matchingResult.data
            });
        }
    }
}

export function updateSelectedStation(station) {
    return {
        type: STATION_SELECT,
        station
    }
}

export function fetchStationDetails(station) {
    return async dispatch => {
        const liveStationDetail = await fetchLiveStation(station);
        dispatch({
            type: STATION_DETAIL,
            station: liveStationDetail.data
        });
    }
}
