"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { PageFooter } from "@/components/page-footer"
import { MobileNav } from "@/components/mobile-nav"
import { X, Play, ExternalLink } from "lucide-react"

interface NewsItem {
  _id: string
  title: string
  description: string
  content: string
  thumbnail: string
  link: string
  linkType: string
  type: string
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-32 bg-gray-300" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-16" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />
      </div>
    </div>
  )
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null)

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

  const newsItems = news.filter((item) => item.type === "News")
  const podcastItems = news.filter((item) => item.type === "Podcast")

  const isYoutubeLink = (link: string) => link.includes("youtube.com") || link.includes("youtu.be")
  const isEmbed = (link: string) => link.includes("<iframe")
  
  const getYoutubeEmbedUrl = (link: string) => {
    const videoId = link.includes("youtu.be") ? link.split("/").pop() : new URL(link).searchParams.get("v")
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#e8f4fd]">
      <PageHeader />
      <main className="flex-1 pt-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
          {/* News Section */}
          <div className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1a237e] mb-2">News</h1>
            <p className="text-gray-600 mb-8">Latest updates and stories from Play Scotland</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {loading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </>
              ) : newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow text-left"
                  >
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover" />
                    )}
                    <div className="p-4">
                      <p className="text-sm text-[#1a237e] font-semibold mb-2">News</p>
                      <p className="text-[#1a237e] font-semibold text-sm leading-snug line-clamp-2">{item.title}</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-600">No news available</p>
              )}
            </div>
          </div>

          {/* Podcast Section */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a237e] mb-2">Podcast</h2>
            <p className="text-gray-600 mb-8">Listen to our latest podcast episodes</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {loading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </>
              ) : podcastItems.length > 0 ? (
                podcastItems.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow text-left relative group"
                  >
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-[#1a237e] ml-1" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-[#1a237e] font-semibold mb-2">Podcast</p>
                      <p className="text-[#1a237e] font-semibold text-sm leading-snug line-clamp-2">{item.title}</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-600">No podcasts available</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Glass Morphism Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30 overflow-hidden">
          <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>

            <div className="overflow-y-auto flex-1 p-8 lg:p-12 scrollbar-hide">
              {selectedItem.link && (
                <div className="mb-8 rounded-2xl overflow-hidden bg-black/10">
                  {isEmbed(selectedItem.link) ? (
                    <div className="w-full" dangerouslySetInnerHTML={{ __html: selectedItem.link }} />
                  ) : isYoutubeLink(selectedItem.link) ? (
                    <iframe
                      width="100%"
                      height="400"
                      src={getYoutubeEmbedUrl(selectedItem.link)}
                      title={selectedItem.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="p-8 text-center bg-gradient-to-br from-[#1a237e]/10 to-[#c5e063]/10 rounded-xl">
                      <Play className="w-12 h-12 text-[#1a237e] mx-auto mb-4" />
                      <p className="text-gray-700 mb-4">Open in external player</p>
                      <a
                        href={selectedItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a237e] hover:bg-[#283593] text-white font-semibold rounded-full transition-colors"
                      >
                        Open Link
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              <h2 className="text-2xl lg:text-3xl font-bold text-[#1a237e] mb-4">{selectedItem.title}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedItem.description}</p>

              {selectedItem.content && (
                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedItem.content}</div>
              )}
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
      `}</style>

      <PageFooter />
      <MobileNav />
    </div>
  )
}
