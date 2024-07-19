"use client"

import { Warning } from "@phosphor-icons/react"

export function Notification() {
  return (
    <div className="w-full gap-6 flex items-center justify-start border-solid border-b border-b-zinc-300 p-4">
      <Warning className="w-12 h-12 text-zinc-700" />
      <div className="flex flex-col justify-center items-start gap-2">
        <p className="text-zinc-800 font-semibold text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <span className="text-zinc-400 font-normal text-xs">A second ago</span>
      </div>
    </div>
  )
}