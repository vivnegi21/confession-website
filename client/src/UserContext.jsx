import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});
const BASE_URL = 'https://confession-website-api.onrender.com'

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            fetch(`${BASE_URL}/profile`,
            {
                method: "GET",
                credentials: "include"
            }).then((res) => res.json()).then(data=>setUser({name:data.name,email:data.email}))
            
        }
    }, [])
return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
)
};