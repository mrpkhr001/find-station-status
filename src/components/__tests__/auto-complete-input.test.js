import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import AutoCompleteInput from "../auto-complete-input";

describe("AutoCompleteInput", () => {

    afterEach(cleanup);

    test("should render input component with placeholder text", () => {
        const {getByPlaceholderText} = render(<AutoCompleteInput  />);

        expect(getByPlaceholderText(/Station/)).toBeInTheDocument();

    });

    test("should allow user to type in search text", () => {
        const onDemandSearch = jest.fn();
        const {getByPlaceholderText} = render(<AutoCompleteInput onDemandSearch={onDemandSearch} />);

        const inputElement = getByPlaceholderText(/Station/);
        fireEvent.input(inputElement, { target: { value: "abc" } });

        expect(onDemandSearch).toHaveBeenCalledWith("abc")
        expect(onDemandSearch).toHaveBeenCalledTimes(1);
    });

    test("should show matching list of stations to user and user should navigate list with key board", () => {
        const onSelect = jest.fn();
        const {rerender} = render(<AutoCompleteInput  />);
        expect(screen.queryByTestId("autoCompleteListWrapper")).not.toBeInTheDocument();
        const inputElement = screen.getByPlaceholderText(/Station/);
        fireEvent.input(inputElement, { target: { value: "abc" } });

        const matchingList = [
            {"name": "Adderley Park", "code": "ADD"},
            {"name": "Addiewell", "code": "ADW"},
            {"name": "Addlestone", "code": "ASN"},
            {"name": "Adisham", "code": "ADM"},
        ];
        rerender(<AutoCompleteInput matchingList={matchingList} onSelect={onSelect} />);
        const listElementWrapper = screen.queryByTestId("autoCompleteListWrapper");
        expect(listElementWrapper).toBeInTheDocument();
        const listElements = listElementWrapper.getElementsByClassName("autocompleteItem");
        expect(listElements.length).toBe(4);
        expect(listElements[0].classList.contains("active")).toBeTruthy();

        //Move down the list
        fireEvent.keyDown(inputElement, { key: 'Down', keyCode: 40 });
        fireEvent.keyDown(inputElement, { key: 'Down', keyCode: 40 });
        expect(listElements[2].classList.contains("active")).toBeTruthy();

        //Move up the list
        fireEvent.keyDown(inputElement, { key: "Up", keyCode: 38 });
        expect(listElements[1].classList.contains("active")).toBeTruthy();


        //Press Enter to select Item
        fireEvent.keyDown(inputElement, { key: "Enter", keyCode: 13 });
        expect(inputElement.value).toMatch(/Addiewell/);
        expect(onSelect).toHaveBeenCalledTimes(1);

        //Press Tab on Input
        fireEvent.keyDown(inputElement, { key: 'Tab', keyCode: 9 });
        expect(screen.queryByTestId("autoCompleteListWrapper")).not.toBeInTheDocument();

    });



})
