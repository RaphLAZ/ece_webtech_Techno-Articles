import React, {useContext, useState} from 'react';
import Layout from '../components/Layout'
import UserContext from "../components/UserContext";
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import {supabase} from '../components/supabaseClient'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Login, setLogin] = useState(true);
    const {login} = useContext(UserContext)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Login) {
            const { error } = await supabase.auth.signInWithPassword(
                {
                    email: username,
                    password: password
                });
            if (error) {
                alert(error.message);
            }
            else {
                alert("You are correctly connected !");
                let { data: users, error } = await supabase
                    .from('users')
                    .select('*')
                    .single()
                if (error){
                    alert(error.message)
                }
                const user = {
                    username: users.first_name,
                    user_id: users.id,
                }
                login(user)
                Cookie.set('userdata', JSON.stringify(user));
                await router.push('/')
            }
        }

        else {
            const { error } = await supabase.auth.signUp(
                {
                    email: username,
                    password: password
                });
            if (error) {
                alert(error.message);
            }
            else {
                alert("your account has been created correctly !")
                let {data: users} = await supabase
                    .from('users')
                    .select('*')
                    .single()
                const user = {
                    username: users.first_name,
                    user_id: users.id,
                }
                login(user)
                Cookie.set('userdata', JSON.stringify(user));
                await router.push('/')
            }
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen bg-white">
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
                    <div className="mt-4 text-center">
                        <p>{Login ? "Don't have an account?" : 'Already have an account?'}</p>
                        <button
                            onClick={() => setLogin(!Login)}
                            className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                        >
                            {Login ? 'Sign up' : 'Log in'}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LoginPage;
