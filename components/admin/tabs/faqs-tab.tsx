"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface FAQ {
  _id: string
  question: string
  answer: string
}

export function FAQsTab() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ question: "", answer: "" })

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch("/api/faqs")
      const data = await response.json()
      setFaqs(data)
    } catch (error) {
      console.error("Failed to fetch FAQs")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = editingId ? "PUT" : "POST"
      const body = editingId ? { id: editingId, ...formData } : formData

      const response = await fetch("/api/faqs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setFormData({ question: "", answer: "" })
        setEditingId(null)
        setShowForm(false)
        fetchFAQs()
      }
    } catch (error) {
      console.error("Failed to save FAQ")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/faqs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchFAQs()
    } catch (error) {
      console.error("Failed to delete FAQ")
    }
  }

  const handleEdit = (faq: FAQ) => {
    setFormData({ question: faq.question, answer: faq.answer })
    setEditingId(faq._id)
    setShowForm(true)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1a237e]">FAQs Management</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ question: "", answer: "" })
          }}
          className="bg-[#1a237e] hover:bg-[#283593] text-white"
        >
          {showForm ? "Cancel" : "Add FAQ"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <Input
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter question"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
              <Textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Enter answer"
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              {editingId ? "Update FAQ" : "Add FAQ"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => handleEdit(faq)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(faq._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
