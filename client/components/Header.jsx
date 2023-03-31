import Link from 'next/link'

const Header = () => {
    return (
        <header className="flex bg-slate-200 px-10 py-2">
            <ul className="flex gap-5">
                <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
                    <Link href="/about">
                        About
                    </Link>
                </li>
                <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
                    <Link href="/contacts">
                        Contacts
                    </Link>
                </li>
                <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
                    <Link href="/events">
                        Events
                    </Link>
                </li>
                <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
                    <Link href="/articles">
                        Books
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header
