"use client"

import { MagnifyingGlass } from "@phosphor-icons/react";
import { TextInput } from "./ui";

export function SearchBar() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <TextInput width="w-96" placeholder="Search using slug" icon={<MagnifyingGlass />} />
    </div>
  );
}
