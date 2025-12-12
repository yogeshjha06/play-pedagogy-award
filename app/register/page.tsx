import { PageHeader } from "@/components/page-header"
import { RegisterForm } from "@/components/register-form"
import { PageFooter } from "@/components/page-footer"
import { MobileNav } from "@/components/mobile-nav"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#e8f4fd]">
      <PageHeader />

      {/* Main Content */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold text-[#1a237e] mb-3">Show your Interest</h1>
            <p className="text-[#64b5f6] text-lg">We'll be in touch within 3 days to schedule your call.</p>
          </div>

          {/* Form Card */}
          <RegisterForm />
        </div>
      </section>

      <PageFooter />
      <MobileNav />
    </main>
  )
}
