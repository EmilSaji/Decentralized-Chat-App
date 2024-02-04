import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';

//Internal Import

import { 
    checkIfWalletConnected,
    connectWallet,
    connectingWithContract
} from '../Utils/apiFeature';


export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({childern}) => {
    const title = 'Hey Welcome to blockchain chat App';

    return(
        <ChatAppContext.Provider value={{title}}>
            {childern}
        </ChatAppContext.Provider>
    )
};
