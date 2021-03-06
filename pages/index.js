import Head from 'next/head'
import LeftBar from '../components/LeftBar'
import Post from '../components/Post'
import RightBar from '../components/RightBar'
import Tweet from '../components/Tweet'
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Modal from '../components/Modal'
import { useState, useEffect, useContext } from 'react';
import { FetchingContext } from '../context/FetchingContext'



export default function Home({posts}) {
  const router = useRouter();
  const { fetchingSsr, setFetchingSsr } = useContext(FetchingContext); 

  const [postsArr, setPostsArr] = useState(posts);
  console.log(postsArr);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/home');
    },
  })
  
  useEffect(() => {
    async function getData() {
      const data = await fetch('http://localhost:3000/api/posts');
      const postData = await data.json();

      setPostsArr(postData);
      console.log(postData);
    }
    if(!fetchingSsr) {
      getData();
      setFetchingSsr(true);
    }
    
  }, [fetchingSsr]);



  return (
    <div>

      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='grid min-h-screen grid-cols-3'>
        <LeftBar></LeftBar>
        
        <div className = "border-r border-gray-200 col-span-2 md:col-span-1">
          <Tweet></Tweet>
          {postsArr?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((post, id) => (
            <Post key = {post._id} post = {post}></Post>
          ))}
        </div>
        
        <div className='hidden md:block'>
          <RightBar></RightBar>
        </div>

        <Modal></Modal>

      </div>

    </div>
  )
}


export async function getServerSideProps(context) {

  const session = await getSession(context);
  if(!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home'
      }
    }
  }

  const data = await fetch('http://localhost:3000/api/posts');
  const posts = await data.json();


  return {
    props: {
      session,
      posts
    }
  }
}