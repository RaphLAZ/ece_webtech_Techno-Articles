import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout.jsx'

export default function LibraryHomepage() {
    return (
        <Layout>
            <Head>
                <title>Library Home</title>
                <meta name="description" content="Welcome to our library" />
            </Head>
            <h1 className='font-bold'>
                Welcome to the library !
            </h1>
            <ul>
                <li>
                    <Link href="/articles">
                        View our books
                    </Link>
                </li>
                <li>
                    <Link href="/events">
                        Library events
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        About the library
                    </Link>
                </li>
                <li>
                    <Link href="/membership">
                        Join the library
                    </Link>
                </li>
                <li>
                    <Link href="/contacts">
                        Contact us
                    </Link>
                </li>
            </ul>
        </Layout>
    )
}