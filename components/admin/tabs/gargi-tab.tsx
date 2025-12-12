"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, ArrowUp, Sparkles, Globe } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestions = [
  "Help me draft a response to a school inquiry",
  "Generate talking points for mentoring sessions",
  "Create a summary of award requirements",
  "Suggest resources for school implementation",
]

export function GargiTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [webSearch, setWebSearch] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage = { role: "user" as const, content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          chatHistory: messages,
          useWebSearch: webSearch,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
      }
    } catch (error) {
      console.error("Chat error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1a237e]/20 to-[#c5e063]/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-[#1a237e]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1a237e]">Gargi AI</h2>
            <p className="text-sm text-gray-500">Connected Insights</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide flex flex-col">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1a237e]/20 to-[#c5e063]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-7 h-7 text-[#1a237e]" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Ask Gargi AI</p>
            </div>
            <div className="grid grid-cols-1 gap-3 w-full max-w-md">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="p-4 text-left text-sm bg-gradient-to-br from-[#1a237e]/5 to-[#c5e063]/5 hover:from-[#1a237e]/10 hover:to-[#c5e063]/10 rounded-xl border border-[#1a237e]/10 hover:border-[#1a237e]/20 transition-all flex items-start gap-3"
                >
                  <Sparkles className="w-5 h-5 text-[#1a237e] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.length > 0 && (
          <>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1a237e] text-white rounded-br-none"
                      : "bg-gray-100/80 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100/80 px-4 py-2.5 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0 flex justify-center">
        <div className="flex flex-col gap-2 w-full max-w-md">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask Gargi..."
              rows={2}
              className="w-full px-4 py-2 pr-10 bg-gray-100/60 border border-gray-200/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/30 transition-all placeholder-gray-500 resize-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="absolute top-2 right-2 w-7 h-7 bg-gradient-to-br from-[#1a237e] to-[#283593] text-white rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => setWebSearch(!webSearch)}
            className={`w-fit px-2 py-1 transition-all text-sm flex items-center gap-1.5 ${
              webSearch
                ? "text-[#1a237e]"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="Toggle web search"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
