import { CreateComponent } from "@/components/WorkingComponent";
function ownPostsPage() {
    return (
        <div>
            <CreateComponent titulo="Estamos trabajando para que puedas ver tus publicaciones 🌎" backLink={"/profile"}/>
        </div>
    )
}

export default ownPostsPage;