import Link from "next/link"
import { SiAuth0 } from "react-icons/si"
import { MainNav } from "@/components/shared/main-nav"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { UserButton } from "@/components/shared/user-button"

export const Navbar = () => {
  return (
    <header className="w-full fixed z-10 top-0 bg-gray-100 dark:bg-gray-900 border-b border-gray-200">
      <nav className="h-16 px-4 flex items-center">
        <Link href="/">
          <SiAuth0 />
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
};

export const TeacherNavbar = () => {

  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Teacher Dashboard</div>
        <Link href="/create-classroom">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Create Classroom
        </button>
        </Link>
      </header>
  )
};