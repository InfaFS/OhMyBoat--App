import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getBoatOffersByModelAndPostId, getVehicleOffersByModelAndPostId } from "../../../../../../../../../../data/getOffers";

async function offersPage({params}) {
    const offers = await getVehicleOffersByModelAndPostId({postId: params.postId,year: params.year})
    console.log(offers)
    return (
        <div>
            <OffersTable data={offers} isBoat={true} postId={params.postId}/>
        </div>
    )
}

export default offersPage;