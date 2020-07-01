import React,{createContext,useState} from 'react';

export const ScreenContext = createContext();

export function ScreenProvider(props) {
    const [screen,setScreen] = useState('');
    return (
        <ScreenContext.Provider value={{screen:screen,setScreen:setScreen}}>
            {props.children}
        </ScreenContext.Provider>
    )
}