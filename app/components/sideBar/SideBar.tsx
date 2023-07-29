import Link from "next/link";

export default function SideBar() {
  return (
    <div className="p-4">
      <ul>
        <li className="mb-2">
          <Link href='/posts/create'>
            Create
          </Link>
        </li>
        <li className="mb-2">
          <Link href='/posts'>
            Posts
          </Link>
        </li>
      </ul>
    </div>
  )
}