import { useContext } from 'react'
import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import UserContext from '../../components/UserContext'

export default function LoggedOut(){
    const {login} = useContext(UserContext)
    const onClickLogin = async (e) => {
        const response = await fetch('/api/profile')
        const user = await response.json()
        login(user)
    }
    return (
        <button
            className="flex gap-2 [&_svg]:h-6 [&_svg]:w-6 text-color"
            onClick={onClickLogin}
        >
            <OutlineUserCircleIcon />
        </button>
    )
}