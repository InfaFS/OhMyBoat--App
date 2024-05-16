import { ProfileManager } from "@/components/profile/ProfileManager"
import { auth } from "../../../../auth"
import { getUserById } from "../../../../data/user"
import {ViewProfileComponentInfa} from "@/components/profile/ViewProfileComponent"
async function viewPage ({params}) {
    const userData = await getUserById(params.id)
    console.log(userData)
    return (
        <div>
        <h1>El id de la pagina es {params.id}</h1>
        {userData ? (
            <ViewProfileComponentInfa firstname={userData.firstname} lastname={userData.lastname} birthday={userData.birthday}  email={userData.email} role={userData.role}/>
        ) : (
            <p>Lo sentimos, no hay un usuario con esos datos.</p>
        )}

        </div>
    )
}

export default viewPage


