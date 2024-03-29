import Layout from "../../components/Layout";
import {useState, useEffect, useContext} from 'react';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import UserContext from "../../components/UserContext";
import {useRouter} from "next/router";
import {supabase} from '../../components/supabaseClient'

export default function ViewArticle({ article }) {
    const [comments, setComments] = useState([]);
    const {user} = useContext(UserContext)
    const router = useRouter();

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select()
            .eq('article_id', article.id)
        if (error) {
            console.error(error);
            return;
        }
        setComments(data);
    };

    useEffect(() => {
        fetchComments().then(() => [article.id]);
    }, [article.id]);

    const handleCommentSubmit = async (newComment) => {
        if (!user) {
            const {error} = await supabase
                .from('comments')
                .insert([
                    {
                        author: "Anonymous",
                        content: newComment,
                        article_id: article.id,
                    },
                ]).single()

            if (error) {
                console.error(error);
                return;
            }
        } else {
            const {error} = await supabase
                .from('comments')
                .insert([
                    {
                        author: user.username,
                        content: newComment,
                        user_id: user.user_id,
                        article_id: article.id,
                    },
                ]).single()

            if (error) {
                console.error(error);
                return;

            }
        }
        router.reload()
    }

    const handleEdit = async() => {
        if (user.user_id !== article.user_id){
            alert("You can only edit articles created by you")
        }
        else{
            await router.push(`/modifyarticle/${article.id}`)
        }
    }

    const handleDelete = async () => {
        if (user.user_id !== article.user_id){
            alert("You can only delete articles created by you")
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
            alert("Article deleted !")
            await router.push('/')
        }
    };

return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div>
                    <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
                    <p className="italic">by {article.author}</p><br/>
                    <p className="text-lg mb-6">{article.description}</p>
                </div>
                {user && (article.user_id === user.user_id) && (
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
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
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
