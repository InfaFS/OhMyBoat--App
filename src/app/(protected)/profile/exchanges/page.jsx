import { CreateComponent } from "@/components/WorkingComponent";
function exchangesPage() {
    return (
        <div>
            <CreateComponent titulo="Estamos trabajando para que puedas ver tu historial de trueques 📖 " backLink={"/profile"}/>
        </div>
    )
}

export default exchangesPage;