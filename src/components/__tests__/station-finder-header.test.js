import React from 'react'
import {render, cleanup} from "../../test-utils";

import StationFinderHeader from "../station-finder-header";

describe("StationFinderHeader", () => {

    afterEach(cleanup)

    test("should render station finder header with initial state", () => {
        const {getByText, getByPlaceholderText} = render(<StationFinderHeader/>,
            {initialState: {search: {searchResult: []}}})

        expect(getByText(/Station Finder/i)).toBeInTheDocument();
        expect(getByPlaceholderText("Station")).toBeInTheDocument();
    });



})
