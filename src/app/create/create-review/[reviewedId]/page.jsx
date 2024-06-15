import CreateReviewComponent from "@/components/publicaciones/Reviews/CreateReview"
async function CreateReviewPage({params}) {
    const id = params.reviewedId
    console.log(id)
    return (
        <CreateReviewComponent reviewedId={id}/>
    )
}

export default CreateReviewPage