import { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
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