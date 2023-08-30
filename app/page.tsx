import Link from "next/link"
import store from './redux/store'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <Link href='/posts/create'> Create POST </Link>
        </div>
        <div>
          <Link href='/posts'> Go to POST List </Link>
        </div>
        <div>
          <Link href='/posts/1'> Go to POST </Link>
        </div>
      </main>
    </Provider>
  )
}
