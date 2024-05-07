"use client"
import NotisMenu from "./HeaderComponents/NotisMenu"
import ProfileMenu from "./HeaderComponents/ProfileMenu"
import AddPublicationMenu from "./HeaderComponents/AddPublicationMenu"

export default function BasicMenuCallback() {

    return (
        <div className="flex items-center space-x-2">
            <AddPublicationMenu/>
            <NotisMenu/>
            <ProfileMenu/>
        </div>
    );
}