import React, { useContext, useState, createContext, type ReactNode } from "react";

interface user {
    fullName: string;
    email: string;
    passsword: string;
}

interface UserContextType {
    userdata: user | null;
    isAuthenticated: boolean;
    signup: (data: user) => void;
    login: (email: string, password: string) => boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('context not able to create');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userdata, setUserdata] = useState<user | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signup = (data: user) => {
        setUserdata(data);
        setIsAuthenticated(true);
    };

    const login = (email: string, password: string) => {
        if (userdata && userdata.email === email && userdata.passsword === password) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    return (
        <UserContext.Provider value={{ userdata, isAuthenticated, signup, login }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;