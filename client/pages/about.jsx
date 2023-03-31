import Layout from "../components/Layout";

export default function About() {
    return (
        <>
            <Layout>
                <title>About Page</title>
                <main>
                    <h1 className='font-bold'>About The Library</h1> <br/>
                    <p style={{fontStyle: 'italic'}}> Hi there! I'm a software engineer.</p>
                </main>
            </Layout>
        </>
    );
}
