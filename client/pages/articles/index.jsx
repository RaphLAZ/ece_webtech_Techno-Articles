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
                    <h1>Articles</h1> <br/>
                    <ul>
                        {articles.map((article) => (
                            <li key={article.id}>
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
