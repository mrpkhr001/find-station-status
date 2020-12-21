import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import {Provider} from 'react-redux'

import {render as reactTestRender} from '@testing-library/react'

import reducer from './reducers'

function render(
    ui,
    {
        initialState,
        store = createStore(reducer, initialState, applyMiddleware(thunk)),
        ...renderOptions
    } = {}
) {
    function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>
    }

    return {...reactTestRender(ui, {wrapper: Wrapper, ...renderOptions}), store}
}

export * from '@testing-library/react'
export {render}
