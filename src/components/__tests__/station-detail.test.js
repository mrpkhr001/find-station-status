import React from 'react'

import {render, screen, within, act, cleanup} from "../../test-utils";

import StationDetail from "../station-detail";
import * as service from "../../services/station-finder-service";

jest.mock("../../services/station-finder-service");

describe("StationDetail", () => {

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    })

    test("should render station detail with initial state", () => {
        const {queryByText} = render(<StationDetail/>,
            {initialState: {selectedStation: {}}})

        expect(queryByText(/Live Station Status/i)).not.toBeInTheDocument();
    });

    test("should render station name of the selected station", () =>{

        service.fetchLiveStation.mockImplementation(() => Promise.resolve({data: {}}));

        const {queryByText} = render(<StationDetail/>,
            {
                initialState:
                    {
                        selectedStation:
                            {station: {name: "Liverpool station", code: "LST"}}
                    }
            })

        expect(queryByText(/Liverpool station/i)).toBeInTheDocument();


    });

    test("should render live details after selected station details are fetched", async () => {
        const liveStation = {
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
        };

        service.fetchLiveStation.mockImplementation(() => Promise.resolve({data: liveStation}));
        await act(async () => {
            render(<StationDetail/>,
                {
                    initialState:
                        {
                            selectedStation:
                                {station: {name: "Liverpool station", code: "LST"}}
                        }
                })

        });


        const liveStationTableHeader = screen.getByTestId("liveStationTableHeader");
        expect(liveStationTableHeader).toBeInTheDocument();
        expect(within(liveStationTableHeader).getByText("Operator")).toBeInTheDocument();
        expect(within(liveStationTableHeader).getByText("Origin Station")).toBeInTheDocument();
        expect(within(liveStationTableHeader).getByText("Destination Station")).toBeInTheDocument();
        expect(within(liveStationTableHeader).getByText("Aimed Departure Time")).toBeInTheDocument();
        expect(within(liveStationTableHeader).getByText("Expected Departure Time")).toBeInTheDocument();

        const liveStationRows = screen.getByTestId("liveStationRows").getElementsByTagName("tr");
        expect(liveStationRows.length).toBe(2);
        expect(within(liveStationRows[0]).getByText("Greater Anglia")).toBeInTheDocument();
        expect(within(liveStationRows[0]).getByText("London Liverpool Street")).toBeInTheDocument();
        expect(within(liveStationRows[0]).getByText("Colchester")).toBeInTheDocument();
        expect(within(liveStationRows[0]).queryAllByText("22:02").length).toBe(2);
    })


})
