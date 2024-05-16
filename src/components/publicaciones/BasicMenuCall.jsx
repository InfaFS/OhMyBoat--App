"use client"
import NotisMenu from "./HeaderComponents/NotisMenu"
import ProfileMenu from "./HeaderComponents/ProfileMenu"
import AddPublicationMenu from "./HeaderComponents/AddPublicationMenu"
import SpecialActionsMenu from "./HeaderComponents/SpecialActionMenu"
export default function BasicMenuCallback({role}) {
console.log(role)
    return (
        <div className="flex items-center space-x-2">
            {role === "ADMIN" && (
                <SpecialActionsMenu/>
            )}
            
            {role === "USER" && (
                <>
                <AddPublicationMenu/>
                <NotisMenu/>
                </>
            )}

            <ProfileMenu/>
        </div>
    );
}