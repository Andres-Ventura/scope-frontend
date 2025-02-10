// IPProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, FunctionComponent } from 'react';
import { DEFAULT_IP_ADDRESS, LOCAL_IP_ADDRESS } from './constants'; // Import from the separate file

interface IPContextType {
    ipAddress: string;
    setIpAddress: (ip: string) => void;
    resetIpAddress: () => void;
}

const IPContext = createContext<IPContextType>({
    ipAddress: DEFAULT_IP_ADDRESS || LOCAL_IP_ADDRESS,
    setIpAddress: () => {},
    resetIpAddress: () => {}
});

export const useIP = () => useContext(IPContext);

export const IPProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [ipAddress, setIpAddress] = useState<string>(DEFAULT_IP_ADDRESS || LOCAL_IP_ADDRESS);

    useEffect(() => {
        const storedIP = localStorage.getItem('ipAddress');
        if (storedIP) {
            setIpAddress(storedIP);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ipAddress', ipAddress);
    }, [ipAddress]);

    const resetIpAddress = () => {
        setIpAddress(DEFAULT_IP_ADDRESS || LOCAL_IP_ADDRESS);
    };

    const value = { ipAddress, setIpAddress, resetIpAddress };

    return (
        <IPContext.Provider value={value}>
            {children}
        </IPContext.Provider>
    );
};