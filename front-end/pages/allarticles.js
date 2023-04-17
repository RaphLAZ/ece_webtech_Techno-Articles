import Link from 'next/link';
import Layout from '../components/Layout';
import {supabase} from "../components/supabaseClient";

function AllArticles({ articles }) {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">All Articles</h1>
                    <Link href="/newarticle">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Article
                        </a>
                    </Link>
                </div>
                {articles.map((article) => (
                    <div key={article.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                        <h2 className="font-bold text-xl mb-2">{article.title}</h2>
                        <p className="text-gray-600 mb-2">{article.author}</p>
                        <div className="overflow-hidden h-20">
                            <p className="text-lg mb-2">{article.description}</p>
                        </div>
                        <div className="mt-2">
                            <Link href={`/viewarticle/${article.id}`}>
                                <a className="text-blue-700 hover:text-blue-900">Read more</a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    let { data } = await supabase.from('articles').select()

    return {
        props: {
            articles: data
        },
    }
}

export default AllArticles;
