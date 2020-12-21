import React from "react";
import {connect} from "react-redux";

import AutoCompleteInput from "./auto-complete-input";
import {StationFinderHeaderWrapper} from "./station-finder-header.styles";
import {searchResultSelector} from "../selectors/search-selectors";
import {updateSelectedStation, findMatchingStations} from "../actions/station-search-actions";

let findStationToken;

export function StationFinderHeader(props){

    function findStations(searchText){
        if(findStationToken){
            findStationToken();
            findStationToken = undefined;
        }
        props.findMatchingStations(searchText, token => {
            findStationToken = token;
        });
    }

    return <StationFinderHeaderWrapper>
        <h3>Station Finder</h3>
        <AutoCompleteInput
            matchingList={props.searchResult}
            onSelect={props.updateSelectedStation}
            onDemandSearch={findStations}
        />
    </StationFinderHeaderWrapper>

}

function mapStateToProps(state){
    return {
        searchResult: searchResultSelector(state)
    }
}

export default connect(mapStateToProps,
    {updateSelectedStation, findMatchingStations})(StationFinderHeader);
