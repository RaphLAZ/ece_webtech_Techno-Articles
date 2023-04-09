import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import {useRouter} from 'next/router';

export default function LoggedOut(){
    const router = useRouter();

    const onClickLogin = async () => {
        await router.push('/login')
    }

    return (
        <button
            className="flex gap-2 [&_svg]:h-6 [&_svg]:w-6 text-color"
            onClick={onClickLogin}
        >
            {"Log in"}
            <OutlineUserCircleIcon />
        </button>
    )
}