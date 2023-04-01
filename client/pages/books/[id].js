import booksData from '../../data/books.json'
import commentsData from '../../data/comments.json'
import Layout from "../../components/Layout";
import { useRouter } from 'next/router'

const Book = ({ book, comments }) => {
    const router = useRouter()

    return (
        <Layout>
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px' }}>
                <h1 className="wt-title centered-text">{book["title"]}</h1>
                <p className="italic">{book["author"]}</p> <br />
                <p>Description: {book["description"]}</p>
            </div> <br/>

            <ul style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px' }}>
                {comments.map((comment) => (
                    <li  style={{ backgroundColor: 'darkgrey', borderRadius: '20px', padding: '20px' }} key={comment.id}>
                        <p>{comment["content"]}</p>
                        <p className="italic">By {comment["author"]}</p>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const { id } = context.params
    const book = booksData.find((book) => book.id === id)
    const comments = commentsData.filter((comment) => comment.id === id)

    return {
        props: {
            book,
            comments
        }
    }
}

export async function getStaticPaths() {
    const paths = booksData.map((book) => ({
        params: { id: book.id.toString() }
    }))

    return {
        paths,
        fallback: false
    }
}

export default Book
