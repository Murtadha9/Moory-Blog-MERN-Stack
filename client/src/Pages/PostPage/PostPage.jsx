
import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../../Components/CallToAction/CallToAction'
import CommentSection from '../../Components/CommentSection/CommentSection'



const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (data.posts.length > 0) {
          setPost(data.posts[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size={'xl'} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p>Error loading post.</p>
      </div>
    );
  }

  return (
    <main className='p-3 flex items-center flex-col mx-auto max-w-6xl min-h-screen'>
      <h1 className='text-3xl mt-10 text-center max-w-2xl mx-auto lg:text-4xl'>{post.title}</h1>
      <Link to={`/search?category=${post.category}`} className='mt-5 self-center'>
        <Button gradientDuoTone={'redToYellow'}>{post.category}</Button>
      </Link>
      <img src={post.image} alt={post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />

      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{(post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>

      <CommentSection postId={post._id} />
    </main>
  );
};

export default PostPage;

