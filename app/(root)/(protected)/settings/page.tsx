import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SettingsForm } from "../_components/settings-form"
import './style.css';

const SettingsPage = async () => {
  return (
    <div className="setting-main-container w-full">
    <Link href="/">
    <Button
        size="lg"
        className="mt-1 absolute left-2 top-3 text-white px-4 py-2 rounded-md"
      >
        Go Dashboard
      </Button></Link>
      <br />
    <section className="flex justify-center bg-#000 items-center h-full w-full">
      
      <SettingsForm />
    </section>
    </div>
  )
}

export default SettingsPage
