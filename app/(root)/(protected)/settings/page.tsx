import { Button } from "@/components/ui/button"
import { SettingsForm } from "../_components/settings-form"

const SettingsPage = async () => {
  return (
    <section className="flex justify-center items-center h-full w-full">
      <SettingsForm />
    </section>
  )
}

export default SettingsPage
