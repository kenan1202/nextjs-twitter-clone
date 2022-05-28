import { useState, useRef } from 'react'
import {
  PhotographIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  CalendarIcon,
} from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSession } from "next-auth/react"
import { useContext } from 'react';
import { FetchingContext } from '../context/FetchingContext'




function Tweet() {
  const [inputVal, setInputVal] = useState('');
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const fileRef = useRef()

  const { setFetchingSsr, fetchingSsr } = useContext(FetchingContext); 

  const { data: session } = useSession();

  console.log(session);

  const onEmojiClick = (event, emojiObject) => {
    const newVal = inputVal + emojiObject.emoji;
    setInputVal(newVal);
  }

  const selectEmoji = () => {
    setOpen(!open);
  }


  const openFile = () => {
    fileRef.current.click();
  }

  const addImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    }
  }

  const sendTweet = async() => {
    if(image && inputVal.trim()) {

      setLoading(true);

      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ 
          postPhoto: image, 
          username: session.user.username, 
          profilePic: session.user.image, 
          postTweet: inputVal.trim().length ? inputVal.trim() : null 
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      setInputVal('');
      setImage(null);
  
      setLoading(false);

      setFetchingSsr(false);

    }
  }

  

  return (
    <div className='p-2 border-b border-gray-200'>
      <h3 className='font-semibold'>Home</h3>
      <div className='flex justify-between mt-2 space-x-3'>
        <img
          src={session.user.image}
          className='w-10 h-10 rounded-full'
        ></img>
        <div className='flex flex-col space-y-2 flex-1'>
          <textarea
            rows='1'
            placeholder="What's happening?"
            className='border-b border-gray-200 outline-none'
            value = {inputVal}
            onChange = {(e) => setInputVal(e.target.value)}
          ></textarea>
          
          <input type="file" accept="image/*" className='hidden' ref = {fileRef} onChange = {addImage}/>
          
          <img
            src={image}
            className={`h-32 w-1/2 ${!image && 'hidden'}`}
          ></img>

          <div className='flex justify-between mt-1'>
            <div className='flex space-x-2 items-center'>
              <PhotographIcon className='w-6 text-[#54B9E5] cursor-pointer' onClick = {openFile}></PhotographIcon>
              <ChartBarIcon className='w-6 text-[#54B9E5] cursor-pointer'></ChartBarIcon>
              
              <Popover className='relative'>
                {() => (
                  <>
                    <Popover.Button>
                        <EmojiHappyIcon className='w-6 text-[#54B9E5] cursor-pointer items-center'></EmojiHappyIcon>
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='opacity-0 translate-y-1'
                      enterTo='opacity-100 translate-y-0'
                      leave='transition ease-in duration-150'
                      leaveFrom='opacity-100 translate-y-0'
                      leaveTo='opacity-0 translate-y-1'
                    >
                      <Popover.Panel className='absolute'>
                        <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                          <Picker onEmojiClick={onEmojiClick} />
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <CalendarIcon className='w-6 text-[#54B9E5] cursor-pointer'></CalendarIcon>
            </div>
            <button className='bg-[#54B9E5] py-2 px-6 rounded-2xl text-white font-semibold' onClick = {sendTweet}>
              {loading ? 'Tweeting' : 'Tweet' }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
