import Layout from "../../components/Layout";
import Link from 'next/link';
import {useState, useEffect, useContext} from 'react';
import { supabase } from "../../components/supabaseClient";
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import UserContext from "../../components/UserContext";
import {useRouter} from "next/router";

export default function ViewArticle({ article }) {
    const [comments, setComments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const {user} = useContext(UserContext)
    const router = useRouter();

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select()
            .eq('articleid', article.id)
        if (error) {
            //console.error(error);
            return;
        }
        setComments(data);
    };

    useEffect(() => {
        fetchComments().then(() => [article.id]);
    }, [article.id]);

    const handleCommentSubmit = async (newComment) => {
        const { data, error } = await supabase
            .from('comments')
            .insert([{...newComment, articleid: article.id}]);
        if (error) {
            console.error(error);
            return;
        }
        router.reload()
    };

    const handleEdit = async() => {
        console.log(user.id)
        if (user.id != article.user_id){
            alert("You can only edit articles created by you")
            return
        }
        else{
            await router.push(`/modifyarticle/${article.id}`)
        }
    }

    const handleDelete = async () => {
        if (user.id != article.user_id){
            alert("You can only delete articles created by you")
            return
        }
        else{
            const { error: articleError } = await supabase
                .from('articles')
                .delete()
                .eq('id', article.id);
            if (articleError) {
                console.error(articleError);
                return;
            }
            setShowPopup(true);
            setTimeout(async () => {
                await router.push('/')
            }, 3000);
        }
    };

return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div>
                    <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
                    <p className="text-gray-600">by {article.author}</p>
                    <p className="text-lg mb-6">{article.description}</p>
                </div>
                {user && article.user_id === user.user_id && (
                <div className="flex">
                    <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4">
                            Edit
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">
                        Delete
                    </button>
                </div>
                )}
                <CommentList comments={comments} />
                <CommentForm onCommentSubmit={handleCommentSubmit} />
                {showPopup && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white rounded p-4">
                            <p>Article deleted.</p>
                            <p>Redirecting to home page in 3 seconds...</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from('articles').select('id');

    if (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }

    const paths = data.map((article) => ({
        params: { id: article.id.toString() },
    }));

    return { paths, fallback: false };
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
    };
}
