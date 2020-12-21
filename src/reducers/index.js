import {combineReducers} from "redux";
import search from "./search-reducers";
import selectedStation from "./selected-station-reducer";


export default combineReducers({
    search,
    selectedStation
})
