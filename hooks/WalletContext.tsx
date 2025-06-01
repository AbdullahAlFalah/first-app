import React, { createContext, useContext, useState } from "react";

interface WalletContextType {
    status: string;
    setStatus: (val: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [status, setStatus] = useState<string>("");
    
    return (
        <WalletContext.Provider value={{ status, setStatus }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWalletContext = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWalletContext must be used within a WalletProvider");
    }
    return context;
};

export default WalletProvider;


