"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  _id: string
  userId: string
  message: string
  createdAt: string
  replies: Array<{ text: string; createdAt: string }>
}

export function MessagesTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Failed to fetch messages")
    } finally {
      setLoading(false)
    }
  }

  const handleReply = async (messageId: string) => {
    if (!replyText.trim()) return

    try {
      const response = await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId, reply: replyText }),
      })

      if (response.ok) {
        setReplyText("")
        fetchMessages()
      }
    } catch (error) {
      console.error("Failed to send reply")
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1a237e] mb-6">Messages</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-2">
          {messages.map((msg) => (
            <button
              key={msg._id}
              onClick={() => setSelectedMessage(msg._id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                selectedMessage === msg._id
                  ? "border-[#1a237e] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold text-gray-900 truncate">{msg.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow p-6">
              {messages
                .filter((m) => m._id === selectedMessage)
                .map((msg) => (
                  <div key={msg._id}>
                    <div className="mb-6 pb-6 border-b">
                      <p className="text-gray-900 mb-2">{msg.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Replies */}
                    <div className="mb-6 space-y-4">
                      {msg.replies.map((reply, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-900">{reply.text}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(reply.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Reply Form */}
                    <div className="space-y-3">
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        rows={3}
                      />
                      <Button
                        onClick={() => handleReply(msg._id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Send Reply
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
