import { useState } from 'react';
import Layout from "../components/Layout";

function Login() {
    const [login, setLogin] = useState(true); // determines if login or signup form is displayed
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { username, password };
        // handle login or signup logic here
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="bg-white p-8 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4 centered-text">{login ? 'Login' : 'Sign Up'}</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="mb-2 font-bold" htmlFor="username">
                            Username:
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
                            {login ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="mt-4">
                        {login ? "Don't have an account?" : 'Already have an account?'}
                        <button
                            onClick={() => setLogin(!login)}
                            className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                        >
                            {login ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
