import Layout from "/components/Layout";

function About() {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <div className="flex flex-wrap items-center justify-center mb-8">
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-8">
                        <div className="flex flex-col items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover rounded-full" src="/Axel-Pape.jpg" alt="Student2" />
                            </div>
                            <div className="mt-4 text-center">
                                <h2 className="text-xl font-bold">Axel Pape</h2>
                                <p className="text-gray-600">Cybersecurity Student</p>
                                <p className="text-gray-600">ECE Engineering School</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/3 mb-8">
                        <div className="flex flex-col items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover rounded-full" src="/Raph-Picture.jpg" alt="Student1" />
                            </div>
                            <div className="mt-4 text-center">
                                <h2 className="text-xl font-bold">Raphael LAZZARI</h2>
                                <p className="text-gray-600">Cybersecurity Student</p>
                                <p className="text-gray-600">ECE Engineering School</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-lg mb-6">
                    Raphael and Axel are two engineering students at ECE Engineering School who share a

                    common passion for cybersecurity. They have always been intrigued by the intricacies
                    of computer systems and how they can be hacked into. They spent countless hours reading
                    up on the latest developments in the field and experimenting with various hacking tools.
                </p>
            </div>
        </Layout>
    );
}

export default About;
