import '../styles/styles.css'
import {UserContextProvider} from '../components/UserContext'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import {useState} from "react";
import {createClient} from "@supabase/supabase-js";

export default function MyApp({ Component, pageProps }) {
    const [supabaseClient] = useState(() => createClient('https://kjxediceuguygzntixdx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqeGVkaWNldWd1eWd6bnRpeGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3MzI1MzgsImV4cCI6MTk5NjMwODUzOH0.K1oAa77nfh2PKaEC6AOxz_qtZNT9Dfcd8YnamBH54jg'))

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

