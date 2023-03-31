import Head from 'next/head';
import Link from 'next/link';
import {articles} from '../../data/articleData';
import Layout from "../../components/Layout";

export default function Articles() {
    return (
        <>
            <Layout>
                <title>Articles Page</title>
                <main>
                    <h1 className='font-bold'>Books</h1> <br/>
                    <ul>
                        {articles.map((article) => (
                            <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
                                <Link href={`/articles/${article.id}`} passHref={true}>
                                    <div>{article.title}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
            </Layout>
        </>
    );
}
