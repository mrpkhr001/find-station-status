import * as types from "../action-types";
import * as searchActions from "../station-search-actions";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as service from "../../services/station-finder-service";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock("../../services/station-finder-service");

describe("StationSearchActions", () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test("should create action to select station", () => {
        const station = {name: "Liverpool Station", code: "LST"}
        const actionExpected = {
            type: types.STATION_SELECT,
            station
        }
        expect(searchActions.updateSelectedStation(station)).toEqual(actionExpected)
    });

    test("should dispatch search result action after results are fetched", async () => {
        const stations = [
                {"name": "Adderley Park", "code": "ADD"},
                {"name": "Addiewell", "code": "ADW"}
            ],
            searchText = "add",
            cancelExecutor = jest.fn();

        service.fetchStations.mockImplementationOnce(() => Promise.resolve({data: stations}));

        const actionExpected = [
            {type: types.SEARCH_RESULT, results: stations}
        ]

        await store.dispatch(searchActions.findMatchingStations(searchText, cancelExecutor));
        expect(store.getActions()).toEqual(actionExpected);
        expect(service.fetchStations).toHaveBeenCalledWith(searchText, cancelExecutor);
        expect(service.fetchStations).toHaveBeenCalledTimes(1);
    });

    test("should dispatch station details action after live station details are fetched", async () => {
        const liveStation = {
                "date": "2020-12-17",
                "time_of_day": "22:00",
                "request_time": "2020-12-17T22:00:10+00:00",
                "station_name": "London Liverpool Street",
                "station_code": "crs:LST",
                "departures": []
            },
            station = {code: "LST"};

        service.fetchLiveStation.mockImplementationOnce(() => Promise.resolve({data: liveStation}));

        const actionExpected = [
            {type: types.STATION_DETAIL, station: liveStation}
        ]

        await store.dispatch(searchActions.fetchStationDetails(station));
        expect(store.getActions()).toEqual(actionExpected);
        expect(service.fetchLiveStation).toHaveBeenCalledWith(station);
        expect(service.fetchLiveStation).toBeCalledTimes(1);
    });

});
