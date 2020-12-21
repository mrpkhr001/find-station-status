import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {InputWrapper, AutocompleteListWrapper} from "./station-finder-header.styles";

export default class AutoCompleteInput extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            listVisible: false,
            focusIndex: 0,
            searchText: ""
        }
    }

    inputHandler = (e) => {
        this.setState({searchText: e.target.value, listVisible: e.target.value.length > 0, focusIndex: 0}, () => {
            this.props.onDemandSearch && this.props.onDemandSearch(this.state.searchText);
        });
    }

    onItemSelect = (station) => {
        if(this.state.listVisible) {
            this.setState({searchText: station.name, listVisible: false});
            this.props.onSelect && this.props.onSelect(station);
        }
    }

    onKeyDownHandler = (e) => {
        if (e.keyCode === 40) { // arrow DOWN
            e.preventDefault();
            this.setState((state) => {
                if (state.focusIndex >= this.props.matchingList.length -1) {
                    return {focusIndex: 0}
                }
                return {focusIndex: state.focusIndex + 1}

            });
        } else if (e.keyCode === 38) { //arrow UP
            e.preventDefault();
            this.setState((state) => {
                if (state.focusIndex <= 0) {
                    return {focusIndex: this.props.matchingList.length - 1}
                }
                return {focusIndex: state.focusIndex - 1}
            });
        } else if (e.keyCode === 13) { // ENTER
            if (this.state.focusIndex > -1) {
                this.onItemSelect(this.props.matchingList[this.state.focusIndex]);
            }
        }else if( e.keyCode === 9 || e.keyCode === 27){ //TAB or ESCAPE
            this.setState({listVisible: false});
        }
    }

    render() {
        const {searchText, focusIndex, listVisible} = this.state;
        const {matchingList = []} = this.props;
        return (
            <InputWrapper>
                <input type="text"
                       value={searchText}
                       className="autoCompleteInput"
                       name="autoCompleteInput"
                       placeholder="Station"
                       onInput={this.inputHandler}
                       onKeyDown={this.onKeyDownHandler}
                />
                {matchingList.length > 0 && listVisible &&
                <AutocompleteListWrapper data-testid="autoCompleteListWrapper">
                    {
                        matchingList.map((item, index) => (
                            <div
                                key={`autoComplete${index}`}
                                className={`autocompleteItem ${focusIndex === index ? "active" : ""}`}
                                onClick={() => this.onItemSelect(item)}
                            >
                                {item.name}
                            </div>
                        ))
                    }
                </AutocompleteListWrapper>
                }
            </InputWrapper>
        );
    }
}


AutoCompleteInput.propTypes = {
    matchingList: PropTypes.array,
    onSelect: PropTypes.func,
    onDemandSearch: PropTypes.func
}

