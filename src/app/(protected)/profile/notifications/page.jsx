import { CreateComponent } from "@/components/WorkingComponent";
function notificationsPage() {
    return (
        <div>
            <CreateComponent titulo="Estamos trabajando para que puedas ver tus notificaciones 📱" backLink={"/profile"} />
        </div>
    )
}

export default notificationsPage;