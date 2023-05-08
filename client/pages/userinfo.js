import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import { useRouter } from 'next/router';
import { supabase } from '../components/supabaseClient';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Userinfo() {
    const [YearofBirth, setYearofBirth] = useState("");
    const [gender, setGender] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [job, setJob] = useState("");
    const { user, login, logout } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.user_id)
                    .single();

                if (error) {
                    console.error(error);
                    return;
                }

                setYearofBirth(data.YearofBirth || '');
                setFirstName(data.first_name || '');
                setLastName(data.last_name || '');
                setCountry(data.country || '');
                setJob(data.job || '');
                setGender(data.gender || '');
            }
        };

        fetchUserData();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userdata = {
                first_name,
                last_name,
                YearofBirth,
                country,
                job,
                gender,
            };

            const { error } = await supabase
                .from('users')
                .update(userdata)
                .eq('id', user.user_id);

            if (error) {
                throw error;
            } else {
                alert('User info updated successfully');
                user.username = userdata.first_name;
                login(user);
                await router.push('/');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating user info');
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="w-full max-w-lg bg-white p-8">
                    <h1 className="text-2xl font-bold mb-4 text-center">Your info</h1>
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
                                        value={first_name || ""}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    />
                                    <label className="mb-2 font-bold" htmlFor="datePicker">
                                        Date of Birth:
                                    </label>
                                    <DatePicker
                                        id="datePicker"
                                        selected={YearofBirth ? new Date(YearofBirth) : ''}
                                        onChange={(date) => setYearofBirth(date)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    />
                                    <label className="mb-2 font-bold" htmlFor="job">
                                        Job:
                                    </label>
                                    <input
                                        type="text"
                                        id="job"
                                        value={job || ""}
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
                                        value={last_name || ""}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    />
                                    <label className="mb-2 font-bold">Gender:</label>
                                    <div className="flex flex-row">
                                        <div className="mr-4">
                                            <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                            <label htmlFor="male" className="ml-2">Male</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                            <label htmlFor="female" className="ml-2">Female</label>
                                        </div>
                                    </div>
                                    <label className="mb-2 font-bold" htmlFor="countrySelect">
                                        Country:
                                    </label>
                                    <select
                                        id="countrySelect"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="mb-4 border rounded-md py-2 px-3"
                                    >
                                        <option value="">Select a country</option>
                                        <option value="USA">United States</option>
                                        <option value="Canada">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                                    Update
                                </button>
                            </div>
                        </div>
                    )}
                    {!user && (
                        <div className="text-l mb-4 text-center">
                            <p>
                                You are not connected. <br /> Please connect yourself to be able
                                to access your information.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}