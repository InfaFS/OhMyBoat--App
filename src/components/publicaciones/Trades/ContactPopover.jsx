"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export function ContactPopover({ name, email, phone,lastname}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="text-xs">{name} {lastname} </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="items-center gap-4">
              <span className="font-medium">Email:  </span>
              <span>{email}</span>
            </div>
            <div className="items-center gap-4">
              <span className="font-medium">Teléfono:  </span>
              <span>{phone}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}