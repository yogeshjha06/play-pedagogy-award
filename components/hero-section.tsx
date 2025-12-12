"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Check, LogIn } from "lucide-react"

const partners = [
  { name: "Crown Primary", logo: "/crown-primary-school-crest-logo.jpg" },
  { name: "Dunbar Primary", logo: "/dunbar-primary-school-crest-logo.jpg" },
  { name: "Our Lady Of The Missions Primary", logo: "/our-lady-missions-primary-school-crest-logo.jpg" },
  { name: "Mearns Primary", logo: "/mearns-primary-school-crest-logo.jpg" },
  { name: "Garrowhill Primary", logo: "/garrowhill-primary-school-crest-logo.jpg" },
  { name: "Kinross Primary", logo: "/kinross-primary-school-crest-logo.jpg" },
]

export function HeroSection() {
  const [scrollX, setScrollX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => {
        const maxScroll = partners.length * 180
        return prev >= maxScroll ? 0 : prev + 1
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-[#1a237e] overflow-hidden rounded-b-[3rem] lg:rounded-b-[4rem]">
      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-12 pt-24 lg:pt-32 pb-8 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="relative animate-float">
                <Image
                  src="/asset/hero.png"
                  alt="Children engaged in play-based learning"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="text-white space-y-6 order-1 lg:order-2">
            <p className="text-[#64b5f6] text-lg lg:text-xl font-medium">The Play Pedagogy Award</p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl">
              Begin your school's
              <br />
              <span className="text-[#c5e063]">play journey</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
              Whole-school framework by <strong className="text-white">Play Scotland</strong>, working closely with{" "}
              <strong className="text-[#c5e063]">Education Scotland</strong>, embedding play pedagogy in Scottish
              primaries.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 bg-[#64b5f6] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span>
                  With <strong className="text-white">expert mentoring, resources, & a community of educators</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 bg-[#64b5f6] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span>
                  A <strong className="text-white">flexible 2-3 year framework</strong> designed for real classrooms
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-2xl">
              <Link href="/register" className="flex-1">
                <Button
                  size="lg"
                  className="bg-[#c5e063] hover:bg-[#b8d458] text-[#1a237e] font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full"
                >
                  Register Your School
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/coming-soon" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1a237e] font-semibold px-8 py-3 text-lg rounded-full transition-all duration-300 bg-transparent w-full"
                >
                  Member Login
                  <LogIn className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 text-center">
          <p className="text-lg text-white/90 mb-8">
            A growing network of <span className="font-bold text-white">40+ Scottish schools</span>
          </p>

          <div className="relative overflow-hidden" ref={containerRef}>
            <div
              className="flex items-center gap-12 lg:gap-16"
              style={{
                transform: `translateX(-${scrollX}px)`,
                width: `${partners.length * 2 * 180}px`,
              }}
            >
              {/* Duplicate partners for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div key={`${partner.name}-${index}`} className="flex items-center gap-3 flex-shrink-0">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                  />
                  <span className="text-white/80 text-sm font-medium whitespace-nowrap">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
