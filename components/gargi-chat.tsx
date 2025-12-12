"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, ArrowUp, Sparkles, Globe } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface GargiChatProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const suggestions = [
  "What is the Play Pedagogy Award?",
  "How long does the award process take?",
  "What support do schools receive?",
  "Tell me about the mentoring program",
]

export function GargiChat({ isOpen: externalIsOpen, onOpenChange }: GargiChatProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || setInternalIsOpen

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
    <>
      {/* Desktop Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl items-center justify-center transition-all duration-300 z-40 bg-gradient-to-br from-[#1a237e] to-[#283593] hover:shadow-2xl"
        aria-label="Open Gargi Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Desktop Chat Window */}
      {isOpen && (
        <div className="hidden md:flex fixed bottom-24 right-6 w-96 max-w-[calc(100vw-1.5rem)] h-[32rem] bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl flex-col z-40 border border-white/40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-white/20 flex-shrink-0">
            <h3 className="font-semibold text-gray-900">Gargi AI</h3>
            <p className="text-xs text-gray-500">Ask about Play Pedagogy</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a237e]/20 to-[#c5e063]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-[#1a237e]" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Ask Gargi AI</p>
                </div>
                <div className="grid grid-cols-1 gap-2 w-full px-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="p-3 text-left text-xs bg-gradient-to-br from-[#1a237e]/5 to-[#c5e063]/5 hover:from-[#1a237e]/10 hover:to-[#c5e063]/10 rounded-lg border border-[#1a237e]/10 hover:border-[#1a237e]/20 transition-all flex items-start gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#1a237e] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 p-4 flex-shrink-0">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="Ask Gargi..."
                  rows={2}
                  className="w-full px-4 py-2 pr-10 bg-gray-100/60 backdrop-blur-sm border border-gray-200/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/30 focus:bg-gray-100/80 transition-all placeholder-gray-500 resize-none"
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
        </div>
      )}

      {/* Mobile Full Screen Chat */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* Mobile Header with Close */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-900 hover:text-gray-600"
              aria-label="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center flex-1">
              <h3 className="font-semibold text-gray-900">Gargi AI</h3>
              <p className="text-xs text-gray-500">Ask about Play Pedagogy</p>
            </div>
            <div className="w-6" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1a237e]/20 to-[#c5e063]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-7 h-7 text-[#1a237e]" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Ask Gargi AI</p>
                </div>
                <div className="grid grid-cols-1 gap-3 w-full">
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
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 flex-shrink-0">
            <div className="flex flex-col gap-2">
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
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-in-from-bottom-4 {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-bottom-4 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
