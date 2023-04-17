import Link from 'next/link';
import Layout from '../components/Layout';
import {supabase} from "../components/supabaseClient";

function HomePage({ articles }) {
    // display only a few viewarticle
    const displayedArticles = articles.slice(0, 3);

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold mb-6">Welcome to our blog!</h1>
                <p className="text-lg mb-6">
                    This blog proposes various topics related to software engineering, technology, and more.
                    Check out our latest articles below.
                </p>

                {displayedArticles.map((article) => (
                    <div key={article.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                        <p className="font-bold text-xl mb-2 hover:text-blue-700">{article.title}</p>
                        <p className="text-gray-600 mb-2">{article.author}</p>
                        <p className="text-lg mb-2">{article.description}</p>
                        <Link href={`/viewarticle/${article.id}`}>
                            <a className="text-blue-700 hover:text-blue-900">Read more</a>
                        </Link>
                    </div>
                ))}

                <div className="flex justify-center mt-8">
                    <Link href="/allarticles">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            See all articles
                        </a>
                    </Link>
                </div>
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

export default HomePage;
