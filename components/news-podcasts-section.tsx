"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, X, Play, ExternalLink } from "lucide-react"
import { PodcastCard } from "./podcast-card"

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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-40 bg-gray-300" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
      </div>
    </div>
  )
}

function NewsCard({ item, onOpen }: { item: NewsItem; onOpen: (item: NewsItem) => void }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left w-full"
    >
      <div className="relative aspect-video overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#c5e063] text-[#1a237e]">
            News
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1a237e] transition-colors line-clamp-2 mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
      </div>
    </button>
  )
}

export function NewsPodcastsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [podcastItems, setPodcastItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news")
        const allNews = await response.json()
        setNewsItems(allNews.filter((item: NewsItem) => item.type === "News").slice(0, 3))
        setPodcastItems(allNews.filter((item: NewsItem) => item.type === "Podcast").slice(0, 3))
      } catch (error) {
        console.error("Failed to fetch news")
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const isYoutubeLink = (link: string) => link.includes("youtube.com") || link.includes("youtu.be")
  const isEmbed = (link: string) => link.includes("<iframe")
  const getYoutubeEmbedUrl = (link: string) => {
    const videoId = link.includes("youtu.be") ? link.split("/").pop() : new URL(link).searchParams.get("v")
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <>
      <section id="news" className="py-16 lg:py-24 bg-gray-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#e87c3e] rounded-full flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a237e]">News & Podcasts</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the latest stories, insights, and resources from Play Scotland, and hear directly from schools and
              educators about embedding play pedagogy.
            </p>
          </div>

          {/* News Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#1a237e] mb-6">News</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {loading ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </>
              ) : newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <NewsCard key={item._id} item={item} onOpen={setSelectedItem} />
                ))
              ) : (
                <p className="text-gray-600">No news available</p>
              )}
            </div>
          </div>

          {/* Podcasts Section */}
          <div>
            <h3 className="text-2xl font-bold text-[#1a237e] mb-6">Podcasts</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {loading ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </>
              ) : podcastItems.length > 0 ? (
                podcastItems.map((item) => (
                  <PodcastCard key={item._id} item={item} />
                ))
              ) : (
                <p className="text-gray-600">No podcasts available</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link href="/news">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#1a237e] text-[#1a237e] hover:bg-[#1a237e] hover:text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 group bg-transparent"
              >
                See more
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
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
    </>
  )
}
