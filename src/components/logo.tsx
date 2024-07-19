"use client"

import { Chat } from "@phosphor-icons/react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/app" className="flex items-center justify-start gap-1">
      <Chat className="w-6 h-6 text-zinc-800" weight="bold"/>
    </Link>
  )
}