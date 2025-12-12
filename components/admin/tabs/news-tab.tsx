"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface News {
  _id: string
  title: string
  description: string
  content: string
  thumbnail: string
  link: string
  linkType: string
  type: string
}

export function NewsTab() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    link: "",
    linkType: "link",
    type: "News",
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news")
      const data = await response.json()
      setNews(data)
    } catch (error) {
      console.error("Failed to fetch news")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = editingId ? "PUT" : "POST"
      const body = editingId ? { id: editingId, ...formData } : formData

      const response = await fetch("/api/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setFormData({ title: "", description: "", content: "", thumbnail: "", link: "", linkType: "link", type: "News" })
        setEditingId(null)
        setShowForm(false)
        fetchNews()
      }
    } catch (error) {
      console.error("Failed to save news")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchNews()
    } catch (error) {
      console.error("Failed to delete news")
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1a237e]">News & Podcasts</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ title: "", description: "", content: "", thumbnail: "", link: "", linkType: "link", type: "News" })
          }}
          className="bg-[#1a237e] hover:bg-[#283593] text-white"
        >
          {showForm ? "Cancel" : "Add News"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter content"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Type</label>
              <select
                value={formData.linkType}
                onChange={(e) => setFormData({ ...formData, linkType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="link">Link (URL)</option>
                <option value="embed">Embed (HTML)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.linkType === "embed" ? "Embed Code (HTML)" : "Link (Video/Podcast)"}
              </label>
              {formData.linkType === "embed" ? (
                <Textarea
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="Paste iframe embed code here"
                  rows={4}
                />
              ) : (
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="Enter link"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option>News</option>
                <option>Podcast</option>
              </select>
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              {editingId ? "Update News" : "Add News"}
            </Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
            <div className="relative">
              {item.thumbnail && (
                <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover" />
              )}
              <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold text-white ${item.type === "Podcast" ? "bg-[#1a237e]" : "bg-[#c5e063] text-[#1a237e]"}`}>
                {item.type}
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">{item.title}</h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setFormData(item)
                    setEditingId(item._id)
                    setShowForm(true)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs flex-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs flex-1"
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
