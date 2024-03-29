import React, { useContext, useState } from 'react';
import Layout from '../components/Layout'
import UserContext from "../components/UserContext";
import { useRouter } from 'next/router';
import { supabase } from '../components/supabaseClient'

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Login, setLogin] = useState(true);
    const {login} = useContext(UserContext)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Login) {
            const {error} = await supabase.auth.signInWithPassword({
                email: username,
                password: password
            });
            if (error) {
                alert(error.message);
            } else {
                alert("You are correctly connected !");
                login()
                await router.push('/')
                await router.reload()
            }
        } else {
            const {error} = await supabase.auth.signUp({
                email: username,
                password: password
            });
            if (error) {
                alert(error.message);
            } else {
                alert("your account has been created correctly !")
                login()
                await router.push('/')
                await router.reload()
            }
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        {Login ? 'Login' : 'Sign Up'}
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="mb-2 font-bold" htmlFor="username">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-4 border rounded-md py-2 px-3"
                        />
                        <label className="mb-2 font-bold" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 border rounded-md py-2 px-3"
                        />

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {Login ? 'Login' : 'Sign Up'}
                        </button>

                    </form>
                    <button
                        onClick={async () => {
                            const { error } = await supabase.auth.signInWithOAuth({
                                provider: 'github',
                            });
                            if (error) {
                                alert(error.message);
                            }
                            else {
                                alert("You are correctly connected !")
                            }
                        }}
                        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 mt-4 w-full"
                    >
                        Sign in with GitHub
                    </button>
                    <div className="mt-4 text-center">
                        <p>{Login ? "Don't have an account?" : 'Already have an account?'}</p>
                        <button
                            onClick={() => setLogin(!Login)}
                            className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                        >
                            {Login ? 'Sign up' : 'Log in'}
                        </button>
                        <br />

                    </div>
                </div>
            </div>
        </Layout>
    );
}