// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInEmail, setLoggedInEmail]=useState(['']);


    useEffect( () => {
        // 로그인 상태 초기화 및 업데이트 로직
        const fetchLoginStatus = async () => {
            try {
            // const isLoggedIn=JSON.parse(localStorage.getItem("isLoggedIn"));
            // setIsLoggedIn(isLoggedIn);
            // console.log("header isLoggedIn: "+isLoggedIn);
            const response = await axios.get('/PlantsPlanet/loginCheck');
            console.log(response);
            // if (response.data!=null) {
            if (response.data.includes('@')) {
                setIsLoggedIn(true);
                setLoggedInEmail(response.data);
                // console.log("header isLoggedIn: "+isLoggedIn);
                console.log("reponse.data!=null")
            } else {
                setIsLoggedIn(false);
                console.log("reponse.data=null")
                // console.log("header isLoggedIn: "+isLoggedIn);
            }
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
            // console.log("header isLoggedIn: "+isLoggedIn);
        }
        };

        fetchLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedInEmail, setLoggedInEmail }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
