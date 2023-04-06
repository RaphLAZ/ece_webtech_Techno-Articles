import { useState, useEffect } from 'react';
import comments from '../../data/comments';
import articles from '../../data/articles';
import Layout from "../../components/Layout";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";
import Link from 'next/link';

function Article({ article, comments }) {
    const { id, title, author, description } = article;
    const [filteredComments, setFilteredComments] = useState([]);

    useEffect(() => {
        const filtered = comments.filter((comment) => comment.id === id);
        setFilteredComments(filtered);
    }, [id, comments]);

    const handleCommentSubmit = (newComment) => {
        setFilteredComments([...filteredComments, newComment]);
        const newComments = [...comments, { ...newComment, id }];
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComments)
        });
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div>
                    <h1 className="text-4xl font-bold mb-6">{title}</h1>
                    <p className="text-gray-600">by {author}</p>
                    <p className="text-lg mb-6">{description}</p>
                </div>
                <Link href={`/edit/${id}`}>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                        Edit
                    </a>
                </Link>
            </div>

            <div className="max-w-3xl mx-auto py-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Comments:</h2>
                <CommentForm onCommentSubmit={handleCommentSubmit} />
                <CommentList comments={filteredComments} />
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = articles.map((article) => ({ params: { id: article.id } }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const article = articles.find((a) => a.id === params.id);
    const filteredComments = comments.filter((c) => c.id === params.id);

    return { props: { article, comments: filteredComments } };
}

export default Article;
