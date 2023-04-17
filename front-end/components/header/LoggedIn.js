import { useContext } from 'react'
import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import UserContext from '../../components/UserContext'

export default function LoggedIn(){
    const {user, logout} = useContext(UserContext)
    const onClickLogout = async (e) => {
        logout()
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