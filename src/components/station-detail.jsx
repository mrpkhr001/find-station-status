import React, {useEffect} from "react";
import {connect} from "react-redux";

import {
    LiveStationHeader,
    SDTableCell,
    SDTableCellCenter,
    SDTableHeader,
    StationDetailTable,
    StationDetailWrapper
} from "./station-detail.styles";
import {liveDetailSelector, selectedStationSelector} from "../selectors/search-selectors";
import {fetchStationDetails} from "../actions/station-search-actions";

export function StationDetail(props) {
    const {station = {}, liveDetails: {departures = []} = {}} = props;
    useEffect(() => {
        const {station = {}} = props;
        if(station.code) {
            props.fetchStationDetails(station);
        }
    }, [props.station]);

    if(station.code === undefined){
        return null;
    }

    return <StationDetailWrapper>
        <LiveStationHeader>
            <label>Live Station Status:</label> <span>{station.name}</span>
        </LiveStationHeader>
        <StationDetailTable>
            <thead data-testid="liveStationTableHeader">
            <tr>
                <SDTableHeader>Operator</SDTableHeader>
                <SDTableHeader>Origin Station</SDTableHeader>
                <SDTableHeader>Destination Station</SDTableHeader>
                <SDTableHeader>Aimed Departure Time</SDTableHeader>
                <SDTableHeader>Expected Departure Time</SDTableHeader>
            </tr>
            </thead>
            <tbody data-testid={`liveStationRows`}>
            {departures.map((item, index) => (
                <tr key={`row-${index}`}
                    className={`${index%2 === 0? "even": "odd"}`}>
                    <SDTableCell>{item.operator_name}</SDTableCell>
                    <SDTableCell>{item.origin_name}</SDTableCell>
                    <SDTableCell>{item.destination_name}</SDTableCell>
                    <SDTableCellCenter>{item.aimed_departure_time}</SDTableCellCenter>
                    <SDTableCellCenter>{item.expected_departure_time}</SDTableCellCenter>
                </tr>
            ))}

            </tbody>
        </StationDetailTable>
    </StationDetailWrapper>
}

function mapStateToProps(state){
    return {
        station : selectedStationSelector(state),
        liveDetails : liveDetailSelector(state)
    }
}

export default connect(mapStateToProps, {fetchStationDetails})(StationDetail);
