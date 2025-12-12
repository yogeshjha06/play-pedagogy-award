"use client"

import { useState } from "react"
import { Play, X, ExternalLink } from "lucide-react"

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

export function PodcastCard({ item }: { item: NewsItem }) {
  const [showModal, setShowModal] = useState(false)

  const isEmbed = item.link.includes("<iframe")
  const isYoutubeLink = item.link.includes("youtube.com") || item.link.includes("youtu.be")
  const getYoutubeEmbedUrl = (link: string) => {
    const videoId = link.includes("youtu.be") ? link.split("/").pop() : new URL(link).searchParams.get("v")
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-[#1a237e] ml-1" />
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#1a237e] text-white">
              Podcast
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30 overflow-hidden">
          <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>

            <div className="overflow-y-auto flex-1 p-8 lg:p-12 scrollbar-hide">
              {item.link && (
                <div className="mb-8 rounded-2xl overflow-hidden bg-black/10">
                  {isEmbed ? (
                    <div className="w-full" dangerouslySetInnerHTML={{ __html: item.link }} />
                  ) : isYoutubeLink ? (
                    <iframe
                      width="100%"
                      height="400"
                      src={getYoutubeEmbedUrl(item.link)}
                      title={item.title}
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
                        href={item.link}
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

              <h2 className="text-2xl lg:text-3xl font-bold text-[#1a237e] mb-4">{item.title}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{item.description}</p>

              {item.content && (
                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">{item.content}</div>
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
