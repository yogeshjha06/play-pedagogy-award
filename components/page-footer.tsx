import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Facebook, Twitter, Instagram, Youtube, LogIn } from "lucide-react"

const quickLinks = [
  { label: "Award", href: "/#award" },
  { label: "FAQs", href: "/#faqs" },
  { label: "News & Podcast", href: "/news" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/nationalplayscotland/", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/Playscotland", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/playscotland/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCR57f5W4E9be7qrcoc-c_1A", label: "YouTube" },
]

export function PageFooter() {
  return (
    <footer className="bg-[#1a237e] text-white rounded-t-[3rem] lg:rounded-t-[4rem] mt-16">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column - Tagline and Buttons */}
          <div className="lg:col-span-5">
            <p className="text-white/90 text-xl lg:text-2xl leading-relaxed italic mb-8">
              Protecting children's right to play across Scotland
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link href="/register" className="flex-1">
                <Button
                  size="lg"
                  className="bg-[#c5e063] hover:bg-[#b8d458] text-[#1a237e] font-semibold rounded-full group px-6 w-full"
                >
                  Register Your School
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/coming-soon" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1a237e] font-semibold rounded-full bg-transparent px-6 py-3 w-full"
                >
                  Member Login
                  <LogIn className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="font-bold text-lg mb-6">Quick links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Connect with us */}
          <div className="lg:col-span-2 lg:col-start-10">
            <h3 className="font-bold text-lg mb-6">Connect with us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:opacity-80"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© 2025 Play Scotland | website by</p>
          <div className="flex items-center gap-2">
            <Image src="/asset/footer-logo.png" alt="Footer Logo" width={180} height={90} className="h-20 w-auto" />
          </div>
        </div>
      </div>

      {/* Extra padding for mobile nav */}
      <div className="h-32 md:hidden" />
    </footer>
  )
}
