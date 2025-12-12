import { PageHeader } from "@/components/page-header"
import { PageFooter } from "@/components/page-footer"
import { ChatWrapper } from "@/components/chat-wrapper"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#e8f4fd]">
      <PageHeader />

      {/* Main Content */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1a237e] mb-4">Coming Soon</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're working on something exciting. Check back soon!
            </p>
          </div>

          <Link href="/">
            <Button
              size="lg"
              className="bg-[#1a237e] hover:bg-[#283593] text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>

      <PageFooter />
      <ChatWrapper />
    </main>
  )
}
