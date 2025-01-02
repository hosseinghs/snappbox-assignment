import { createContext, useState, ReactNode } from "react";

// Define the shape of the context
interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}, // Default function
});

// Props for the AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Custom provider to encapsulate state logic
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
