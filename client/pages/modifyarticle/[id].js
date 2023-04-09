import {useContext, useEffect, useState} from "react";
import Layout from "../../components/Layout";
import {supabase} from "../../components/supabaseClient";
import UserContext from "../../components/UserContext";
import {useRouter} from "next/router";

export default function ModifyArticle({ article }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {user} = useContext(UserContext)
    const router = useRouter();

    console.log(user)


    useEffect(() => {

        setTitle("vrivrvi");
        setDescription(article.description);
    }, [article]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description) {
            alert("Please fill in all the fields.");
            return;
        }
        console.log(user)
        if(!user){
            alert("You need to be connected to be able to modify an article")
            return
        } else if (user.id != article.user_id) {
            alert("You can only modify articles created by you")
            await router.push(`/viewarticle/${article.id}`)
            return
        }

        const { error} = await supabase.from("articles").update([
            {
                title: title,
                author: user.username,
                description: description,
                user_id: user.user_id,
            },
        ])
            .eq('id', article.id);

        if (error) {
            console.log(error.message)
            alert("An error occurred while creating the article.");
        }
        else {
            alert("Article successfully modified!");
            await router.push(`/viewarticle/${article.id}`)
        }
    };

    const handleCancel = async () => {
        await router.push(`/viewarticle/${article.id}`)
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Modify Article
                </h1>
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
                            Modify Article
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const { id } = params;
    const { data, error } = await supabase
        .from('articles')
        .select()
        .eq('id', id)
        .single();

    if (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }

    return {
        props: {
            article: data,
        },
        revalidate: 60 // regenerate page every 60 seconds
    };
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from("articles").select("id");

    if (error) {
        console.log(error.message);
        return {
            notFound: true,
        };
    }

    const paths = data.map((article) => ({
        params: { id: String(article.id) },
    }));

    return {
        paths,
        fallback: false,
    };
}
