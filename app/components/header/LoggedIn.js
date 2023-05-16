import { useContext } from 'react'
import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import UserContext from '../../components/UserContext'
import {useRouter} from "next/router";
import {supabase} from "../supabaseClient";

export default function LoggedIn(){
    const {user, logout} = useContext(UserContext)
    const router = useRouter();

    const onClickLogout = async () => {
        await supabase.auth.signOut()
        logout()
        alert("You are successfully logged out")
        await router.push('/')
    }

    return (
        <button
            className="flex gap-2 [&_svg]:h-6 [&_svg]:w-6 text-color"
            onClick={onClickLogout}
        >
            {user.username}
            <OutlineUserCircleIcon />
        </button>
    )
}