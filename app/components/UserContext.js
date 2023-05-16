import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "./supabaseClient";

const UserContext = createContext(undefined);

export default UserContext;

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    async function getUser() {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            const { data: users, error } = await supabase
                .from("users")
                .select("*")
                .single();
            if (error) {
                console.error(error.message);
            }
            const user = {
                username: users.first_name,
                user_id: users.id,
            };
            setUser(user);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                login: () => {
                },
                logout: async () => {
                    await router.push("/");
                    await router.reload();
                },
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
