import { createContext, useState, useEffect } from "react";
import Cookie from 'js-cookie';
import {useRouter} from "next/router";
import {supabase} from "./supabaseClient";

const UserContext = createContext(undefined);

export default UserContext;

export const UserContextProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    const router = useRouter();

    // Load the user from the cookie when the component mounts
    useEffect( () => {
        const cookieUser = Cookie.get('user');
        if (cookieUser) {
            const parsedUser = JSON.parse(cookieUser);
            setUser(parsedUser);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user: user,
                login: (user) => {
                    setUser({ ...user, isLoggedIn: true });
                    Cookie.set('user', JSON.stringify({ ...user, isLoggedIn: true }));
                },
                logout: async () => {
                    setUser({isLoggedIn: false});
                    Cookie.remove('user');
                    await router.reload()
                    await router.push('/')
                }
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
