import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhyTeachersSection } from "@/components/why-teachers-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AwardSection } from "@/components/award-section"
import { ForYourSchoolSection } from "@/components/for-your-school-section"
import { NewsPodcastsSection } from "@/components/news-podcasts-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <WhyTeachersSection />
      <StatsSection />
      <TestimonialsSection />
      <AwardSection />
      <ForYourSchoolSection />
      <NewsPodcastsSection />
      <FaqSection />
      <Footer />
      <MobileNav />
    </main>
  )
}
