"use client"

import { useState } from "react"
import { GargiChat } from "./gargi-chat"
import { MobileNav } from "./mobile-nav"

export function ChatWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <MobileNav onChatClick={() => setIsChatOpen(!isChatOpen)} />
      <GargiChat isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  )
}
