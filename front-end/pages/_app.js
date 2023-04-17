import '../styles/styles.css'
import {UserContextProvider} from "../components/UserContext";
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";


export default function MyApp({Component, pageProps}) {
    const [supabase] = useState(() => createBrowserSupabaseClient())

    return (
        <SessionContextProvider
            supabaseClient={supabase}
            initialSession={pageProps.initialSession}>
            <UserContextProvider>
                <Component {...pageProps} />
            </UserContextProvider>
        </SessionContextProvider>
    )
}
