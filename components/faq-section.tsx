"use client"

import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"

interface FAQ {
  _id: string
  question: string
  answer: string
}

export function FaqSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    fetchFAQs()
  }, [])

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 bg-[#e87c3e] rounded-full flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a237e]">FAQs</h2>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading FAQs...</div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq._id}
                value={faq._id}
                className="bg-gray-50 rounded-2xl px-6 border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-[#1a237e] py-6 [&[data-state=open]]:text-[#1a237e]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  )
}
