import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { supabase } from "../components/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function HomePage({ articles }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide) => (currentSlide + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const displayedArticles = articles.slice(0, 3);

    const carouselImages = [
        { src: "/cybersecurity.jpg", alt: "Picture 1" },
        { src: "/software.jpg", alt: "Picture 2" },
        { src: "/technologies.jpg", alt: "Picture 3" },
    ];

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold my-6">Welcome to our blog!</h1>
                <p className="text-lg mb-6">
                    This blog proposes various topics related to software engineering,
                    technology, and more. Check out our latest articles below.
                </p>
                <div className="relative w-full h-80">
                    <Image
                        src={carouselImages[currentSlide].src}
                        alt={carouselImages[currentSlide].alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>{" "}
                <br />
                {displayedArticles.map((article) => (
                    <div
                        key={article.id}
                        className="bg-gray-100 rounded-lg p-4 mb-4"
                    >
                        <p className="font-bold text-xl mb-2 hover:text-blue-700">
                            {article.title}
                        </p>
                        <p className="text-gray-600 mb-2">{article.author}</p>
                        <p className="text-lg mb-2">{article.description}</p>
                        <button className="text-blue-700 hover:text-blue-900">
                            <Link href={`/viewarticle/${article.id}`}>Read more</Link>
                        </button>
                    </div>
                ))}
                <div className="flex justify-center mt-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link href="/allarticles">See all articles</Link>
                    </button>
                </div>
            </div>
            <style jsx>{`
        .rounded-lg {
          border-radius: 10px;
        }
        .rounded-lg img {
          width: 100%;
          height: 100%;
        }
      `}</style>
        </Layout>
    );
}

export async function getStaticProps() {
    let { data } = await supabase.from("articles").select();

    return {
        props: {
            articles: data,
        },
    };
}
