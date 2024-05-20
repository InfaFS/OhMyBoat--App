import { ProfileManager } from "@/components/profile/ProfileManager"
import { auth } from "../../../../auth"
import { getUserById } from "../../../../data/user"
import {ViewProfileComponentInfa} from "@/components/profile/ViewProfileComponent"
import { CreateComponent } from "@/components/WorkingComponent"
async function viewPage ({params}) {
    const userData = await getUserById(params.id)
    console.log(userData)
    return (
        <div>
        {userData ? (
            <ViewProfileComponentInfa firstname={userData.firstname} lastname={userData.lastname} birthday={userData.birthday}  email={userData.email} role={userData.role}/>
        ) : (
            <CreateComponent titulo="No pudimos encontrar el perfil vuelve más tarde 😔 " backLink={"/"}/>
        )}

        </div>
    )
}

export default viewPage


