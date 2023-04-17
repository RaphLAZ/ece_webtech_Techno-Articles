import React, {useContext, useEffect, useState} from 'react';
import Layout from '../components/Layout'
import UserContext from "../components/UserContext";
import {useRouter} from "next/router";
import {supabase} from '../components/supabaseClient'

async function fetchUserData() {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();
    if (error) {
        console.log(error.message)
        return
    }
    else{
        return data;
    }
}

export default function Userinfo() {
    const [YearofBirth, setYearofBirth] = useState(null)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [country, setCountry] = useState(null)
    const [job, setJob] = useState(null)
    const {user, login, logout} = useContext(UserContext)
    const router = useRouter();


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchUserData();

                setYearofBirth(data.year_of_birth);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setCountry(data.country);
                setJob(data.job);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userdata = {
                first_name,
                last_name,
                YearofBirth,
                country,
                job
            };

            const { error } = await supabase
                .from('users')
                .update(userdata)
                .eq('id', user.user_id);

            if (error) {
                throw error;
            }
            else{
                alert('User info updated successfully');
                user.username = userdata.first_name;
                login(user)
                await router.push('/')
            }

        } catch (error) {
            console.error(error);
            alert('Error updating user info');
        }
    }

    const handleDeleteAccount = async () => {
        let { data, error } = await supabase
            .rpc('deleteUser')

        if (error){
            alert(error.message)
            return
        }
        else{
            alert("Account has been successfully deleted !")
            logout()
        }
    }

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Your info
                    </h1>
                    {user && (
                        <div className="flex flex-col">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 font-bold" htmlFor="first_name">
                                        First Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        value={first_name || ''}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    />
                                    <label className="mb-2 font-bold" htmlFor="password">
                                        Year of birth:
                                    </label>
                                    <input
                                        type="text"
                                        id="YearofBirth"
                                        value={YearofBirth || ''}
                                        onChange={(e) => setYearofBirth(e.target.value)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    />
                                    <label className="mb-2 font-bold" htmlFor="job">
                                        Job:
                                    </label>
                                    <input
                                        type="text"
                                        id="job"
                                        value={job || ''}
                                        onChange={(e) => setJob(e.target.value)}
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
                                        value={last_name || ''}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    />
                                    <label className="mb-2 font-bold" htmlFor="country">
                                        Country:
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        value={country || ''}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    />
                                </div>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleSubmit}>
                                Update
                            </button><br/>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleDeleteAccount}>
                                Delete Account
                            </button>
                        </div>
                    )}
                    { !user &&(
                        <div className="text-l mb-4 text-center">
                            <p> You are not connected. <br/> Please connect yourself to be able to access your information.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )

}