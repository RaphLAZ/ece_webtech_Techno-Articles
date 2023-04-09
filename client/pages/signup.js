import React, { useState } from 'react';
import { supabase } from "../components/supabaseClient";
import Layout from '../components/Layout'

function Signup() {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [country, setCountry] = useState('')
    const [job, setJob] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { user, error } = await supabase.auth.signUp({ email: username, password: password })

        if (error) {
            alert(error.message)
            setLoading(false)
        } else {
            const { data, error } = await supabase.from('users').insert([{ email: username, first_name, last_name, country, job }])
            if (error) {
                alert(error.message)
            } else {
                setSuccess(true)
            }
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Sign up
                    </h1>
                    {success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p className="font-bold">Success!</p>
                            <p>Your account has been created.</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
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
                                <label className="mb-2 font-bold" htmlFor="first_name">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mb-4 border rounded-md py-2 px-3"
                                />
                            </div>
                            <div>
                                <label className="mb-2 font-bold" htmlFor="last_name">
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mb-4 border rounded-md py-2 px-3"
                                />
                                <label className="mb-2 font-bold" htmlFor="country">
                                    Country:
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="mb-4 border rounded-md py-2 px-3"
                                />
                                <label className="mb-2 font-bold" htmlFor="job">
                                    Job:
                                </label>
                                <input
                                    type="text"
                                    id="job"
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)}
                                    className="mb-4 border rounded-md py-2 px-3"
                                />
                            </div>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Signup;