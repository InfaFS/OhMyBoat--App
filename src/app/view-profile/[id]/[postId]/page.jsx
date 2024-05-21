import { ProfileManager } from "@/components/profile/ProfileManager"
import { auth } from "../../../../../auth"
import { getUserById } from "../../../../../data/user"
import {ViewProfileComponentInfa} from "@/components/profile/ViewProfileComponent"
import { CreateComponent } from "@/components/WorkingComponent"
async function viewPageWithPostId ({params}) { 
    console.log(params.postId)
    const url = params.postId
    const valueBeforeEqualSign = url.split("boat")[0];
    console.log(valueBeforeEqualSign)
    const valueAfterEqualSign = url.split("%3D")[1];
    console.log(valueAfterEqualSign); // Output: false
    let postIdBackLink = ""
    if (valueAfterEqualSign === "false") {
        postIdBackLink = `/viewPosts/view-vehicle/${valueBeforeEqualSign}`;
    }
    else if (valueAfterEqualSign === "true") {
        postIdBackLink = `/viewPosts/view-ship/${valueBeforeEqualSign}`
    }
    const userData = await getUserById(params.id)
    console.log(userData)
    return (
        <div>
        {userData ? (
            <ViewProfileComponentInfa firstname={userData.firstname} lastname={userData.lastname} birthday={userData.birthday}  email={userData.email} role={userData.role} id={userData.id} postIdBackLink={postIdBackLink}/>
        ) : (
            <CreateComponent titulo="No pudimos encontrar el perfil vuelve más tarde 😔 " backLink={"/"}/>
        )}

        </div>
    )
}

export default viewPageWithPostId


