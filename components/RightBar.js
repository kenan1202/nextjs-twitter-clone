import { 
    SearchIcon
} from '@heroicons/react/outline'
import Followers from './Followers'

function RightBar() {
    return (
        <div className='p-2 w-[300px]'>
            <div className='bg-gray-200 flex space-x-2 p-2 rounded-xl'>
                <SearchIcon className = 'w-5'></SearchIcon>
                <input type = 'text' placeholder = "Search Twitter" className='bg-transparent outline-none'></input>
            </div>

            <Followers></Followers>
        </div>
    )
}

export default RightBar