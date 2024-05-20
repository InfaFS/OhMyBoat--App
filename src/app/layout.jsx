import { Inter } from "next/font/google";

import "@/app/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });
import { HeaderTincho } from "@/components/publicaciones/Header";
import { Toaster } from "sonner";
export const metadata = {
  title: "OhMyBoat!",
  description: "Generated by create next app",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Oh_My_Boat_logo_4.jpg" type="jpg" />
      </head>
      <body className="bg-blancoahumado">
        <Toaster richColors position="top-center"/>
        <HeaderTincho/>
        {children}
        </body>
    </html>
  );
}
