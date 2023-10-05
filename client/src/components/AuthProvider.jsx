import { useState } from "react";
import AuthContext from "../context/AuthContext";
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const saveUser = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const getUser = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, saveUser, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;