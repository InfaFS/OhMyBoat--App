import { auth } from "../../../../../../../auth";
import { SetDateComponent } from "@/components/publicaciones/Trades/SetDate/SetDateComponent";
import { DateAlreadySetted } from "../../../../../../../actions/tradeActions";
async function SetDatePage({params}) {
    const session = await auth();
    const userId = session.user?.id;
    const alreadySetted = await DateAlreadySetted({idTrade:params.tradeId,idUser:userId});
    console.log(alreadySetted);
    return (
        <div>
            <SetDateComponent alreadySetted={alreadySetted} userId={userId} tradeId={params.tradeId}/>
        </div>
    )
}

export default SetDatePage