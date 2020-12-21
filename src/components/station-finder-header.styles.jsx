import styled from 'styled-components';

export const StationFinderHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background: #faebd7;
    
    input{
        width: 250px;
        padding: 6px;
        font-size: 18px;
        border-radius: 4px;
    }
`;

export const InputWrapper = styled.div`
    position : relative
`

export const AutocompleteListWrapper = styled.div`
    margin: 2px 0px;
    background: #F0F8FF;
    border: 1px solid #c1c0c0;
    box-shadow: 0px 5px 8px 0px #e3d6d6;
    border-radius: 4px;
    position: absolute;
    left: 0px;
    right: 0;
    max-height: 60vh;
    overflow: auto;
    
    .autocompleteItem {
        padding: 10px;
        cursor: pointer;
        background-color: #fff; 
        border-bottom: 1px solid #d4d4d4; 
    }

    .autocompleteItem:hover {
      background-color: #dad9cf; 
    }

    .autocompleteItem.active {
      background-color: #1a8dfd; 
      color: #ffffff; 
    }
`


