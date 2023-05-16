import {useContext, useState} from "react";
import Layout from "../components/Layout";
import UserContext from "../components/UserContext";
import {useRouter} from 'next/router';
import {supabase} from '../components/supabaseClient'

export default function NewArticle() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {user} = useContext(UserContext)
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description) {
            alert("Please fill in all the fields.");
            return;
        }

        if (!user){
            alert("You need to be registered to be able to create an article")
            return
        }

        const {error } = await supabase
            .from("articles")
            .insert([
                {
                title: title,
                author: user.username,
                description: description,
                user_id: user.user_id,
                },
            ]).single();

        if (error) {
            alert(error.message)
        }
        else {
            alert("Article successfully added !");
            await router.push('/')
        }
    };

    const handleCancel = () => {
        // Reset form fields
        setTitle("");
        setDescription("");
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Create New Article
                </h1>
                { user &&(
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className="border border-gray-400 p-2 w-full rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
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
                            Create Article
                        </button>
                    </div>
                </form>
                )}
                { !user && (
                    <p className= "text-center">You are not connected.<br/> You need to be connected to be able to create an article.</p>
                )}
            </div>
        </Layout>
    );
}
