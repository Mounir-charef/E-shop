import {createContext, useState, useEffect} from "react";


const AuthContext = createContext();

export default AuthContext;

// export const AuthContextProvider = (props) => {
//     const [username, setUsername] = useState(null);
//     const [token, setToken] = useState(null);
//
//     const getLoggedIn = async () => {
//         const loggedIn = localStorage.getItem("auth-token");
//     }};
//
//     useEffect(() => {
//         getLoggedIn();
//     }, []);

    export const AuthProvider = ({children}) => {
        return (
        <AuthContext.Provider value={{'name': 'Mounir'}}>
            {children}
        </AuthContext.Provider>
        );
    }