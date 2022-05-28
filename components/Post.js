import { useState, useEffect, useRef, useContext } from 'react';
import { 
    DotsHorizontalIcon,
    ChatIcon,
    TrashIcon,
    HeartIcon,
    ShareIcon,
    ChartBarIcon
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import Comment from './Comment.js';
import Moment from 'react-moment'
import moment from 'moment';
import { useSession } from "next-auth/react"
import { ModalContext } from '../context/ModalContext.js';
import { FetchingContext } from '../context/FetchingContext'


function Post(props) {
    const [commentOpen, setCommentOpen] = useState(false);
    const [likeCount, setLikeCount] = useState(props.post.likes.length);
    const { data: session } = useSession();
    const [liked, setLiked] = useState(props.post.likes.includes(session.user.username) ? true : false);
    const comment = useRef();
    // const [commentArr, setCommentArr] = useState([]);
    const [commentArr, setCommentArr] = useState(props.post.comments);
    const { openModal } = useContext(ModalContext);

    const { setFetchingSsr, fetchingSsr } = useContext(FetchingContext); 

    async function updatePost() {
        await fetch(`/api/like/${props.post._id}`, {
            method: 'PUT',
            body: JSON.stringify({ username: session.user.username }),
            headers: { 
                'Content-Type': 'application/json'
            }
        });    
    }

    useEffect(() => {
        async function getPost() {
            const data = await fetch(`/api/posts/${props.post._id}`);
            const {likes, comments} = await data.json();

            setLikeCount(likes.length);

            if(likes.includes(session.user.username)) {
                setLiked(true);
            }
            else {
                setLiked(false);
            }

            if(!(comments.length === commentArr.length)) {
                setCommentArr(comments);
            } 
        }

        getPost();
    }, [liked]);


    const like = async() => {
        setLiked(true);
        updatePost();
    }

    const dislike = async() => {
        setLiked(false);
        updatePost();
    }

    const sendComment = async() => {

        await fetch(`/api/comment/${props.post._id}`, {
            method: 'PUT',
            body: JSON.stringify({ commentText: comment.current.value, commentedBy: session.user.username, profilePic: session.user.image}),
            headers: { 
                'Content-Type': 'application/json'
            }
        });   


        const data = await fetch(`/api/posts/${props.post._id}`);
        const {comments} = await data.json();


        setCommentArr(comments);
        comment.current.value = '';
        setFetchingSsr(false);

    }


    const deletePost = async() => {
        await fetch(`/api/posts/${props.post._id}`, {method: 'DELETE'});

        setFetchingSsr(false);
    }

    return (
        <div className='flex space-x-2 p-2 border-b border-gray-200'>
            <img src = {props.post.profilePic} className="w-10 h-10 rounded-full"></img>
            <div className='w-full'>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-1 space-x-1 items-center'>
                            <h4 className = "font-semibold">{props.post.username}</h4>
                            <p className = 'text-gray-300 text-xs'>
                                <Moment fromNow>
                                    {props.post.date}
                                </Moment>
                            </p>
                        </div>
                        <DotsHorizontalIcon className='w-5'></DotsHorizontalIcon>
                    </div>
                    {props.post.postTweet && <p className='break-all'>{props.post.postTweet}</p>}
                </div>
                {props.post.postPhoto && <img src = {props.post.postPhoto} className="h-64 w-full" onClick={() => openModal(props.post.postPhoto)}></img>}
                <div className='flex justify-between mt-2'>
                    <div className='flex space-x-1 cursor-pointer'>
                        <ChatIcon className='w-5' onClick = {() => setCommentOpen(!commentOpen)}></ChatIcon>
                        <p>{commentArr?.length}</p>
                    </div>
                    {(props.post.username === session.user.username) && <TrashIcon className='w-5 cursor-pointer' onClick = {deletePost}></TrashIcon>}
                    <div className='flex space-x-1 cursor-pointer'>
                        {liked ? <HeartIconFilled className='w-5 text-red-700' onClick={dislike}></HeartIconFilled> : <HeartIcon className='w-5' onClick={like}></HeartIcon>}
                        <p>{likeCount}</p>
                    </div>
                    <ShareIcon className='w-5 cursor-pointer'></ShareIcon>
                    <ChartBarIcon className='w-5 cursor-pointer'></ChartBarIcon>
                </div>

                {commentOpen && 
                <div>
                    <div className='flex space-x-2 my-2'>
                        <img src = {props.post.profilePic} className="w-8 h-8 rounded-full"></img>
                        <input type = "text" placeholder = 'Type comment...' ref = {comment} className = 'bg-transparent text-sm focus:outline-0 flex-1'></input>
                        <button className='text-sm bg-blue-400 px-2 rounded-lg text-white' onClick = {sendComment}>Send</button>
                    </div>
                    {commentArr?.length >= 1 ? <div className={`${commentArr.length > 1 ? 'h-20' : 'h-10'} overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-blue-400`}>
                        {commentArr.sort((a, b) => new Date(b.commentCreated) - new Date(a.commentCreated)).map((el, id) => (
                            <Comment comment = {el} key = {id}></Comment>
                        ))}
                    </div> : null}
                </div>
                }
                
            </div>
        </div>
    )
}

export default Post