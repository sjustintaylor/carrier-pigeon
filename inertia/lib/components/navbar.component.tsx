import { Link } from '@inertiajs/react'
import { handleLogout } from '../utils/handle_logout'

export const Navbar = () => {
  return (
    <div className="w-full mt-8">
      <ul className="flex space-x-4 mx-auto max-w-max items-center">
        <li>
          <Link href="/users/create" className="text-blue-800 hover:underline">
            Create a new user
          </Link>
        </li>
        <li>
          <Link href="/users/me/edit" className="text-blue-800 hover:underline">
            Update your password
          </Link>
        </li>
        <li>
          <Link href="/files/create" className="text-blue-800 hover:underline">
            Upload a file
          </Link>
        </li>
        <li>
          <Link href="/files" className="text-blue-800 hover:underline">
            View my files
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="btn-ghost hover:underline text-base text-red-800"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
