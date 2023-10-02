'use client'
import { useEffect, useState } from "react";
import MainLayout from "../layout/layout";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PostProp } from "./create/page";

export default function PostList() {
  const path = usePathname()
  const [posts, setPosts] = useState<PostProp[]>([])
  let postList: PostProp[] | null
  const getPosts = async () => {
    try {
      const { data: response } = await axios.get('http://localhost:3000/posts')
      setPosts(response)
      return posts
    } catch (error) {
      console.log(error)
    }
  }
  if(path === '/posts') {
    postList = posts.filter((p: PostProp) => p.fileType === 'published')
  }
  if(path === '/posts/draft') {
    postList = posts.filter((p: PostProp) => p.fileType === 'offline')
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getPosts() }, [])
  console.log(' loading list page ... ')
  return (
    <MainLayout>
      <ul>
        {
          postList.length > 0
            ? postList.map((post: PostProp) =>
              <li key={post.id} className="p-4 w-4/5 text-slate-600 hover:bg-slate-100 hover:rounded-sm">
                <Link href={`/posts/${post.id}`}>
                  <div className="flex justify-between">
                    <p>
                      {post.title}
                    </p>
                    <button className="p-2 text-xs rounded bg-emerald-500 text-slate-50 hover:text-emerald-500  hover:bg-slate-50 hover:border-emerald-500">
                      edit
                    </button>
                  </div>
                </Link>
              </li>)
            : <div>no data</div>
        }
      </ul>
    </MainLayout>
  )
}