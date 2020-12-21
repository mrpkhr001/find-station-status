import axios from "axios";

const BASE_URL = "http://savills-techtest-nwapi.eba-eammdiqd.eu-west-2.elasticbeanstalk.com";

const api = axios.create({
    baseURL: BASE_URL,
});

function responseHandler(response){
    if(response.status === 200){
        return response.data
    }
    throw new Error(response.status);
}

function errorHandler(error){
    if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
    } else {
        throw error;
    }
}


export function fetchStations(searchText, cancelExecutor){
    let queryParam = '';
    if(searchText){
        queryParam = `?name=${searchText}`;
    }
    return api.get(`/stations${queryParam}`,
        {cancelToken: new axios.CancelToken(cancelExecutor)})
        .then(responseHandler)
        .catch(errorHandler);
}

export function fetchLiveStation(station){
    return api.get(`/stations/${station.code}`)
        .then(responseHandler)
        .catch(errorHandler);
}
