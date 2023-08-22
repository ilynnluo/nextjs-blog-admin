'use client'
import { useEffect, useState } from "react";
import MainLayout from "../../layout/layout";
import axios from "axios";
import Link from "next/link";
import { PostProp } from "../create/page";

export default function DraftPostList() {
  const [posts, setPosts] = useState<PostProp[]>([])
  const getPostTitle = async () => {
    try {
      const { data: response } = await axios.get('http://localhost:3000/posts')
      const draftPosts = response.filter((p: PostProp) => p.fileType === 'offline')
      setPosts(draftPosts)
      return posts
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPostTitle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <MainLayout>
      <ul>
        {
          posts.length > 0
            ? posts.map((post: PostProp) =>
              <li key={post.id} className="p-4 w-4/5 text-slate-600 hover:bg-slate-100 hover:rounded-sm">
                <Link href={`/posts/draft/${post.id}`}>
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