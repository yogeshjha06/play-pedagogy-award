"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "The children here are so happy with Play-based learning finally being part of their everyday journey. Engagement is up across the entire school.",
    author: "Yvonne Adams",
    role: "Head Teacher, Darnley Primary School",
    image: "/professional-female-head-teacher-portrait.jpg",
    rating: 5,
  },
  {
    quote:
      "The Play Pedagogy Award has transformed how our staff approach learning. Children are more engaged, creative, and confident than ever before.",
    author: "Sarah Mitchell",
    role: "Deputy Head, Crown Primary School",
    image: "/professional-female-deputy-head-teacher-portrait.jpg",
    rating: 5,
  },
  {
    quote:
      "Being part of this network has given us access to incredible resources and support. Our school community has never been stronger.",
    author: "James Wilson",
    role: "Head Teacher, Garrowhill Primary School",
    image: "/professional-male-head-teacher-portrait.jpg",
    rating: 5,
  },
  {
    quote:
      "The framework is flexible yet structured, allowing us to adapt it to our unique school context while maintaining high standards.",
    author: "Emma Thompson",
    role: "Principal Teacher, Mearns Primary School",
    image: "/professional-female-principal-teacher-portrait.jpg",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-16 lg:py-24 bg-[#e8f4fd]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 bg-[#f5a623] rounded-full flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a237e]">Testimonials</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-8 lg:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={150}
                        height={150}
                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover shadow-lg"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      {/* 5 Star Rating */}
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#f5a623] text-[#f5a623]" />
                        ))}
                      </div>
                      <blockquote className="text-lg lg:text-xl text-gray-700 font-medium leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <p className="font-bold text-[#1a237e] text-lg">{testimonial.author}</p>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#1a237e] hover:shadow-xl transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#1a237e] hover:shadow-xl transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#1a237e] w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
