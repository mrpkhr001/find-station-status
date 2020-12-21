import * as types from "../../actions/action-types";
import reducer from "../search-reducers";

describe("search reducer", () => {

    test("should return default state", () => {

        const state = reducer(undefined, {});
        expect(state).toEqual({searchResult: []});
    });

    test("should update state with provided station results", () => {
        const results = [{name: "Liverpool Street", code: "LST"}];
        const state = reducer({}, {
            type: types.SEARCH_RESULT, results
        });
        expect(state.searchResult).toEqual(results);
    })
})
