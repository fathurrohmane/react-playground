import { useContext, createContext, useState, useEffect, ReactNode } from "react";

const GlobalContext = createContext({});

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalProviderProps) => {
    const getToken = localStorage.getItem("token");

    const [token, setToken] = useState(getToken);

    useEffect(() => {
        if (token) {
            console.log("Token found");
        } else {
            console.log("No token");
        }
    }, [token]);

    return (
        <GlobalContext.Provider value={{ token, setToken }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}