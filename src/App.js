import './App.css';
import {Provider} from "react-redux";

import store from "./store";

import StationDetail from "./components/station-detail";
import StationFinderHeader from "./components/station-finder-header";

function App() {
    return (
        <Provider store={store}>
            <StationFinderHeader/>
            <StationDetail/>
        </Provider>
    );
}


export default App;
