import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href='/posts/create'> Create POST </Link>
        <Link href='/posts'> Go to POST List </Link>
        <Link href='/posts/1'> Go to POST </Link>
      </div>
    </main>
  )
}
