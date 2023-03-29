import { useRouter } from "next/router";
import { getArticleById } from "../../data/articleData";
import Layout from "../../components/Layout";

export default function Article() {
    const router = useRouter();
    const { articleId } = router.query;
    const article = getArticleById(articleId);

    return (
        <>
            <Layout>
                <main>
                    <h1>{article.title}</h1> <br/>
                    <p className='italic'> By {article.author}</p> <br/>
                    <p className='italic'> {article.content}</p>
                </main>
            </Layout>
        </>
    );
}
