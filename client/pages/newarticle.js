import { useState } from "react";
import Layout from "../components/Layout";

function NewArticle() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any field is empty
        if (!title || !author || !description) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/newarticle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, author, description }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const newArticle = await response.json();
            console.log("New article added:", newArticle);

            // Reset form and show success message
            setTitle("");
            setAuthor("");
            setDescription("");
            setSuccessMessage("Article successfully added!");
            setErrorMessage("");
        } catch (error) {
            console.error(error);

            // Show error message
            setSuccessMessage("");
            setErrorMessage("Something went wrong! Please try again.");
        }

        setIsSubmitting(false);
    };

    const handleCancel = () => {
        // Reset form fields
        setTitle("");
        setAuthor("");
        setDescription("");
    };


    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Article</h1>
                {successMessage && (
                    <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-md">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
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
                        <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                            className="border border-gray-400 p-2 w-full rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
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
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Create Article
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default NewArticle;