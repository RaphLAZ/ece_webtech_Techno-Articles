import Header from './Header'
import Footer from './Footer'

export default function Layout({
   children
}){
    return (
        <div>
            <Header />
            <main className="py-10 min-h-screen max-w-full md:max-w-3xl md:mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    )
}