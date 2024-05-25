import { CreateComponent } from "@/components/WorkingComponent";
import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getOffersByPostId } from "../../../../../../data/getOffers";
async function offersPage({params}) {
    const offers = await getOffersByPostId({postId: params.postId});
    return (
        <div>
            <OffersTable data={offers}/>
        </div>
    )
}

export default offersPage;