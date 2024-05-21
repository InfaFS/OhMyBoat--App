import { CreateComponent } from "@/components/WorkingComponent";

function ViewReviewsPage({params}) {
    console.log(params.userId)
    return (
        <div>
            <CreateComponent titulo={`Estamos trabajando para que puedas ver las reseñas de otros usuarios`}/>
        </div>
    );
}

export default ViewReviewsPage;