import '../styles/styles.css'
import {UserContextProvider} from "../components/UserContext";
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {createClient} from "@supabase/supabase-js";

export default function MyApp({Component, pageProps}) {
    const [supabaseClient] = useState(() => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}>
            <UserContextProvider>
                <Component {...pageProps} />
            </UserContextProvider>
        </SessionContextProvider>
    )
}
