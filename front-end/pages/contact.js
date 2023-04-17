import React, { useState } from "react";
import Layout from "../components/Layout";


function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                // Handle success
                console.log('Data written to file');
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                // Handle error
                console.error('Error writing to file');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 font-bold text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="5"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your message"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-block px-6 py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Contact;
