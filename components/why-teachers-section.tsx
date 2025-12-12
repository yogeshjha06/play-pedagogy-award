import Image from "next/image"
import { FileText, Users, Award, ArrowRight } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Resources",
    description: "Practical frameworks, templates, and guides (P1-P7)",
    benefit: "So you spend less time searching, more time implementing",
  },
  {
    icon: Users,
    title: "Support",
    description: "Expert mentoring + bi-monthly community meetings",
    benefit: "So you have both guidance & have accountability",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "National accreditation + Play Scotland visibility",
    benefit: "So your work is seen and celebrated",
  },
]

export function WhyTeachersSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-12 lg:mb-16">
          <div className="w-10 h-10 bg-[#f5a623] rounded-full flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a237e]">
            Why Teachers Choose the Play Pedagogy Award?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-[#e8f0fe] rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all duration-300 border border-[#c5d9f7]"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#1a237e] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1a237e] mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex items-center gap-2 text-[#1a237e]">
                      <ArrowRight className="w-4 h-4" />
                      <p className="font-medium">{feature.benefit}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Image (unchanged) */}
          <div className="relative hidden lg:block">
            <Image
              src="/asset/action.png"
              alt="Children engaged in play-based learning"
              width={500}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
