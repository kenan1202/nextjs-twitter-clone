import { 
    HomeIcon,
    HashtagIcon,
    BellIcon,
    BookmarkIcon,
    CollectionIcon,
    UserIcon,
    DotsCircleHorizontalIcon
} from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'
import { WrapperIcon } from './WrapperIcon'


function LeftBar() {
    const logout = () => signOut({ callbackUrl: '/home' });

    return (
        <div className='border-r border-gray-200 flex flex-col space-y-6 pt-4'>
            <div className='self-end space-y-6 pr-4'>
            <img src = 'https://upload.wikimedia.org/wikipedia/sco/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png' className = 'h-7 w-7' alt = 'Twitter Logo'></img>
            <div className='flex flex-col space-y-4'>

                {WrapperIcon(HomeIcon, 'Home')}
                {WrapperIcon(HashtagIcon, 'Explore')}
                {WrapperIcon(BellIcon, 'Notifications')}
                {WrapperIcon(BookmarkIcon, 'Bookmarks')}
                {WrapperIcon(CollectionIcon, 'Lists')}
                {WrapperIcon(UserIcon, 'Sign Out', logout)}
                {WrapperIcon(DotsCircleHorizontalIcon, 'More')}

            </div>

            <button className = 'bg-[#54B9E5] py-2 px-12 text-white font-bold rounded-2xl'>Tweet</button>
        </div>
        </div>
    )
}

export default LeftBar