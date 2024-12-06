"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

function SidebarSearch() {
  const [open, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative w-full max-w-56">
        <Input
          placeholder="Pretraga..."
          readOnly
          className="h-10 focus-visible:ring-0 cursor-pointer px-8 rounded-sm placeholder:text-xs bg-secondary/10"
          onClick={(e) => {
            setIsOpen(true);
          }}
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
      </div>
      <CommandDialog open={open} onOpenChange={setIsOpen}>
        <DialogTitle />
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SidebarSearch;
