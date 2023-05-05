import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import UserContext from "../../components/UserContext";
import { useRouter } from "next/router";
import { supabase } from "../../components/supabaseClient";

export default function ModifyComment({ comment }) {
    const [content, setContent] = useState("");
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        setContent(comment.content);
    }, [comment]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!content) {
            alert("Please fill in the content field.");
            return;
        }

        if (!user) {
            alert("You need to be connected to modify a editcomment");
            return;
        } else if (user.user_id !== comment.user_id) {
            alert("You can only modify comments created by you");
            await router.push("/");
            return;
        }

        const { error } = await supabase
            .from("comments")
            .update({
                content: content,
            })
            .eq("id", comment.id);

        if (error) {
            console.log(error.message);
            alert("An error occurred while modifying the editcomment.");
        } else {
            alert("Comment successfully modified!");
            await router.push("/");
        }
    };

    const handleCancel = async () => {
        await router.push("/");
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Modify Comment
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Content
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
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
                            Modify Comment
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const { id } = params;
    const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }

    return {
        props: {
            comment: data,
        },
    };
}
