import Image from "next/image"
import { Check, ArrowRight } from "lucide-react"

const benefits = [
  {
    text: "If you are a Scottish primary school (P1- P7) of any size or stage, this award is designed with you in mind.",
    bold: "Scottish primary school (P1- P7)",
  },
  {
    text: "It supports your curriculum goals while promoting inclusivity for all learners.",
    bold: "inclusivity for all learners.",
  },
  {
    text: "It recognises your school's achievements and fits into the work you're already doing.",
    bold: "recognises your school's achievements",
  },
]

export function ForYourSchoolSection() {
  return (
    <section className="relative py-8 bg-[#e8f4fd]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative h-[900px] lg:h-[1000px] rounded-3xl overflow-hidden">
          {/* Background Image */}
          <Image
            src="/school-children-and-teachers-celebrating-with-play.jpg"
            alt="School celebration with Play Pedagogy banner"
            fill
            className="object-cover object-center"
          />

          {/* Content Card - Bottom with padding */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              {/* Left Content - Title */}
              <div className="flex items-start gap-4 lg:col-span-2">
                <div className="w-10 h-10 bg-[#e87c3e] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl lg:text-4xl font-bold text-[#1a237e] leading-tight">
                  Yes, this Award
                  <br />
                  can be for your
                  <br />
                  school too!
                </h2>
              </div>

              {/* Right Content - Benefits */}
              <div className="space-y-5 lg:col-span-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#e87c3e] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[#1a237e]/80 leading-relaxed">
                      {benefit.text.split(benefit.bold)[0]}
                      <strong className="text-[#1a237e]">{benefit.bold}</strong>
                      {benefit.text.split(benefit.bold)[1]}
                    </p>
                  </div>
                ))}
                {/* Additional text without bullet */}
                <p className="text-[#1a237e]/80 leading-relaxed pl-9">
                  It aligns with national priorities including Curriculum for Excellence, GIRFEC, UNCRC, HGIOS, and
                  Realising the Ambition
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
