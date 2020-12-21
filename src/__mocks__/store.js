import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"

const initialState = {
    search: {},
    selectedStation: {
        station: {name: "London Liverpool Street", code: "LST"},
        liveDetails: {
            "departures": [
                {
                    "operator_name": "Greater Anglia",
                    "aimed_departure_time": "22:02",
                    "origin_name": "London Liverpool Street",
                    "destination_name": "Colchester",
                    "expected_departure_time": "22:02",
                },
                {
                    "operator_name": "London Overground",
                    "aimed_departure_time": "22:03",
                    "origin_name": "London Liverpool Street",
                    "destination_name": "Chingford",
                    "expected_departure_time": "22:03",
                }
            ]
        }
    }
}

const store = createStore(state => state, initialState, applyMiddleware(thunk));

export default store;
