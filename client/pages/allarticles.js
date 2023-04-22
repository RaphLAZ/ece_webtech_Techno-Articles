import Link from 'next/link';
import Layout from '../components/Layout';
import {supabase} from '../components/supabaseClient'

export default function AllArticles({ articles }) {

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">All Articles</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link href={'/newarticle'}>
                            Add article
                        </Link>
                    </button>
                </div>
                {articles.map((article) => (
                    <div key={article.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                        <h2 className="font-bold text-xl mb-2">{article.title}</h2>
                        <p className="text-gray-600 mb-2 italic">{article.author}</p>
                        <div className="overflow-hidden h-20">
                            <p className="text-lg mb-2">{article.description}</p>
                        </div>
                        <div className="mt-2">
                            <button className="text-blue-700 hover:text-blue-900">
                                <Link href={`/viewarticle/${article.id}`}>
                                    Read more
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    let { data } = await supabase
        .from('articles')
         .select()

    return {
        props: {
            articles: data
        },
    }
}