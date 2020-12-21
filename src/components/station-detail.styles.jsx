import styled from 'styled-components';

export const StationDetailWrapper = styled.div`
    
    max-height: calc(100vh - 123px);
    overflow-y: auto
`;

export const LiveStationHeader = styled.div`
    padding: 12px 0;
    text-align : center;
    span{
        font-size: 18px;
        font-weight: 600; 
    }
`;

export const StationDetailTable = styled.table`
    border: 2px solid gray;
    border-spacing: 0px;
    margin: 12px auto;
    max-width: 992px;
    width: 100%;
}
    
`;

export const TableHeader = styled.th``;

export const SDTableHeader = styled(TableHeader)`
    padding: 6px;
    border-bottom: 2px solid gray;
    text-align: left;
    & + ${TableHeader}{
        border-left: 2px solid gray;
    }
`;

export const SDTableCell = styled.td`
    padding: 6px;
    .odd > &{
        background-color: #f3f3f3;
    }
`;

export const SDTableCellCenter = styled(SDTableCell)`
    text-align: center;
`;
