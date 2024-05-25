import { getBoatPostById } from "../../../../../data/posts"
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CreateComponent } from "@/components/WorkingComponent";
import { BoatView } from "@/components/publicaciones/Boats/BoatView";
import { auth } from "../../../../../auth";
async function ViewShip({ params }) {
  const boatPost = await getBoatPostById(params.shipId);
  const session = await auth();

  console.log(boatPost);

  return (
    <div className="flex items-center justify-center h-screen">
      <BoatView boatPost={boatPost} userSessionId={session?.user.id} />
    </div>
  );
}

export default ViewShip;
