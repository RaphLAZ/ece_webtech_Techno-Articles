import {useState} from "react";
import Layout from "../components/Layout";
import {useRouter} from 'next/router';
import {supabase} from '../components/supabaseClient'

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !message) {
            alert("Please fill in all the fields.");
            return;
        }

        const {error} = await supabase
            .from("contactrequest")
            .insert([
                {
                    name: name,
                    email: email,
                    message: message,
                },
            ]).single();
        if (error) {
            alert(error.message)
        } else {
            alert("Message successfully sent !");
            await router.push('/')
        }
    };

    const handleCancel = () => {
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Contact Us
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="border border-gray-400 p-2 w-full rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="border border-gray-400 p-2 w-full rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className="border border-gray-400 p-2 w-full rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
};
