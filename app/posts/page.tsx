'use client'
import { useEffect, useState } from "react";
import MainLayout from "../layout/layout";
import axios from "axios";

export interface PostProp {
  "id": number
  "title": string
  "cover": string
  "introduction": string
  "length": number
  "unit": string
  "areaTags": string[]
  "departure": {
    "province": string
    "city": string
  },
  "desitinations": {
    "id": number
    "province": string
    "city": string
    "spots": {
      "id": number
      "name": string
    }[]
    "features": {
      "id": number
      "name": string
    }[]
    "activities": {
      "id": number
      "name": string
    }[]
  }[]
}

export default function PostList() {
  const [posts, setPosts] = useState<PostProp[] | null>(null)
  const getPostTitle = async () => {
    try {
      const { data: response } = await axios.get('http://localhost:3000/posts')
      setPosts(response)
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
      <div className="container mx-auto p-4">
        <ul>
          {
            posts?.map((post: PostProp) =>
              <li key={post.id} className="p-4 w-4/5 text-slate-600 hover:bg-slate-100 hover:rounded-sm">
                <div className="flex justify-between">
                  <p>
                    {post.title}
                  </p>
                  <button className="p-2 text-xs rounded bg-emerald-500 text-slate-50 hover:text-emerald-500  hover:bg-slate-50 hover:border-emerald-500">
                    edit
                  </button>
                </div>
              </li>)
          }
        </ul>
      </div>
    </MainLayout>
  )
}