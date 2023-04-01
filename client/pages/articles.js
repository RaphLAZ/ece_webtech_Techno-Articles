import Link from 'next/link';
import books from '../data/books.json';
import Layout from '../components/Layout';

export default function Articles({ books }) {
    return (
        <Layout>
            <div>
                <h1 className="wt-title centered-text text-color">All Books</h1>
                <ul style={{backgroundColor: 'white', borderRadius: '20px', padding: '20px'}}>
                    {books.map((book) => (
                        <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100" key={book.id}>
                            <Link href={`/books/${book.id}`}>
                                <span>{book.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    return {
        props: {
            books,
        },
    };
}
