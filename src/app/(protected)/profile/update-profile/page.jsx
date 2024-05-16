import { ProfileManager } from "@/components/profile/ProfileManager"
import { auth } from "../../../../../auth"
import { getUserById } from "../../../../../data/user"
export default async function updateProfile() {
  const session = await auth()
  const userData = await getUserById(session.user.id)
  console.log(userData)

  return (
    <div>
      <h1>aca se actualiza el perfil</h1>
    </div>
  )
}

