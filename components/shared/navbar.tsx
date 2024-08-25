import Link from "next/link"
import { SiAuth0 } from "react-icons/si"
import { MainNav } from "@/components/shared/main-nav"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { UserButton } from "@/components/shared/user-button"
import { Button } from '@/components/ui/button';
import { auth } from "@/auth"

export const Navbar = async () => {
  const session = await auth()
  
  return (
    <header className="w-full fixed bg-[#f8fafc] z-10 top-0 dark:bg-gray-900 border-b border-gray-200">
      <nav className="h-16 px-4 flex items-center">
        <Link href="/">
          <img width={89} src="https://quiz.saylaniwelfare.com/images/smit.png" alt="SMIT-logo" />
        </Link>
        {/* <MainNav /> */}
        <div className="ml-auto flex items-center space-x-4">
          {session?.user?.role == "teacher" && <Link href="/create-classroom"><Button size="lg">Create classroom</Button></Link>}
          {session?.user?.role == "admin" && <Link href="/create-teacher"><Button size="lg">Create teacher</Button></Link>}
          <UserButton />
          {/* <ModeToggle /> */}
        </div>
      </nav>
    </header>
  )
};