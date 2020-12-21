import * as types from "../../actions/action-types";
import reducer from "../selected-station-reducer";

describe("select station reducer", () => {

    test("should return default state", () => {

        const state = reducer(undefined, {});
        expect(state).toEqual({});
    });

    test("should update state with provided selected station", () => {
        const station = {name: "Liverpool Street", code: "LST"};
        const state = reducer({}, {
            type: types.STATION_SELECT, station
        });
        expect(state.station).toEqual(station);
    });

    test("should update state with provided live station detail", () => {
        const station = {name: "Liverpool Street", code: "LST"};
        const state = reducer({}, {
            type: types.STATION_DETAIL, station
        });

        expect(state.liveDetails).toEqual(station);
    })
})
