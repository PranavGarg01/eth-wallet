import React,{createContext,useState} from 'react';
import Web3 from 'web3';
export const ScreenContext = createContext();

export function ScreenProvider(props) {
    const [screen,setScreen] = useState('auth');
    let web3 = new Web3(process.env.REACT_APP_INFURA_URL);
    const [web,setWeb3] = useState(web3)

    return (
        <ScreenContext.Provider value={{screen:screen,setScreen:setScreen,web3:web,setWeb3:setWeb3}}>
            {props.children}
        </ScreenContext.Provider>
    )
}