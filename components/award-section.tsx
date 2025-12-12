import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, ClipboardList, Send, Presentation, ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Plan",
    duration: "(3–6 months approx.)",
    description:
      "Start with a self-evaluation to map strengths and set next steps across leadership, pedagogy, environment, community, and professional learning.",
    icon: ClipboardList,
  },
  {
    title: "Play",
    duration: "(12–18 months approx.)",
    description:
      "Put your plan into action, embedding play pedagogy and gathering evidence of change, impact and pupil voice.",
    icon: Send,
  },
  {
    title: "Present",
    duration: "(when your school is ready)",
    description:
      "Share your school's unique journey, celebrate progress, and receive national recognition as a Play Pedagogy Award school.",
    icon: Presentation,
  },
]

export function AwardSection() {
  return (
    <section id="award" className="py-16 lg:py-24 bg-[#e8f4fd]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Award Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#f5a623] rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1a237e]">The Award</h2>
              </div>

              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  The Award adapts to your school's context, shaped by your learners, values, and community. It costs{" "}
                  <strong className="text-gray-900">£950 per school</strong> and includes expert mentoring, all resources,
                  and connection to a network of Scottish schools. Many schools use school improvement budgets or local
                  authority grants. Payment can be split into two instalments, and we'll discuss options during your
                  discovery call.
                </p>
                <p className="font-semibold text-[#1a237e]">
                  The Award is valid for three years, with reaccreditation to showcase your continued impact.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-[#c5e063] hover:bg-[#b8d458] text-[#1a237e] font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Register Your School
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Steps in white cards with curved corners and icons */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group bg-[#e4f0f9] rounded-2xl p-6 border border-[#c5d9f7] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <h3 className="text-xl font-bold text-[#1a237e]">
                      {index + 1}. {step.title}
                    </h3>
                    <span className="text-sm text-gray-500 mt-1">{step.duration}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-[#1a237e]" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
