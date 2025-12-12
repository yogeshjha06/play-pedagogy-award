"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  {
    prefix: "↑",
    value: 80,
    suffix: "%",
    description: "have seen children more confident about coming to school, improving attendance.",
    bgImage: "/asset/flow-1.png",
  },
  {
    prefix: "↑",
    value: 100,
    suffix: "%",
    label: "of schools",
    description: "report staff confidence in play pedagogy has increased.",
    bgImage: "/asset/flow-2.png",
  },
  {
    value: 100,
    suffix: "%",
    label: "teachers",
    description: "say play pedagogy has improved participation for children with additional support needs.",
    bgImage: "/asset/flow-3.png",
  },
]

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundImage: `url('${stat.bgImage}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-white/85" />
              <div className="relative z-10">
                <div className="text-5xl lg:text-6xl font-bold text-[#1a237e] mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                {stat.label && <p className="text-lg font-semibold text-gray-700 mb-3">{stat.label}</p>}
                <p className="text-gray-600 leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
