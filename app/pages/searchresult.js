import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { supabase } from '../components/supabaseClient';
import React from "react";

export default function SearchResult({ searchResults }) {
    const router = useRouter();
    const { q } = router.query;

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">
                        Search Results for "{q}"
                    </h1>
                </div>
                {searchResults.map((result) => (
                    <div key={result.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                        <h2 className="font-bold text-xl mb-2">{result.title}</h2>
                        <p className="text-gray-600 mb-2 italic">{result.author}</p>
                        <div className="overflow-hidden h-20">
                            <p className="text-lg mb-2">{result.description}</p>
                        </div>
                        <div className="mt-2">
                            <button className="text-blue-700 hover:text-blue-900">
                                <Link href={`/viewarticle/${result.id}`}>
                                    Read more
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
                {!searchResults.length && (
                    <div className="text-l mb-4 text-center">
                    <p>
                    No articles was found for "{q}".
                    </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { q } = context.query;

    const { data } = await supabase
        .from('articles')
        .select()
        .or(`title.ilike.%${q}%, description.ilike.%${q}%`);

    return {
        props: {
            searchResults: data,
        },
    };
}
