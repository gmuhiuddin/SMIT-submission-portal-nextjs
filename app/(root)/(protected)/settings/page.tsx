import { Button } from "@/components/ui/button"
import { SettingsForm } from "../_components/settings-form"
import Link from "next/link"

const SettingsPage = async () => {
  return (
    <>
    <Link href="/">
    <Button
        size="lg"
        className="mt-16 absolute left-3 top-3 text-white px-4 py-2 rounded-md"
      >
        Go Dashboard
      </Button></Link>
      <br />
    <section className="flex justify-center bg-#000 items-center h-full w-full">
      
      <SettingsForm />
    </section>
    </>
  )
}

export default SettingsPage
