import Moment from 'react-moment'
import moment from 'moment';

function Comment({comment}) {

    return (
        <div className='flex space-x-2 mt-2'>
            <img src = {comment.profilePic} className="w-8 h-8 rounded-full"></img>
            <div>
                <div className='flex space-x-2 items-center'>
                    <h2 className='text-sm font-semibold'>{comment.commentedBy}</h2>
                    <div className='text-xs text-gray-500'>
                        <Moment fromNow>
                            {comment.commentCreated}
                        </Moment>
                    </div>
                </div>
                <p className = 'text-sm'>{comment.commentText}</p>
            </div>
        </div>
    )
}

export default Comment