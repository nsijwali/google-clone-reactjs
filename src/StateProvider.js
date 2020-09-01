import React, { createContext, useContext, useReducer } from 'react';

// preparing a data layer
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// hook helps us to pull information form data-layer
export const useStateValue = () => useContext(StateContext);