"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronRight, X, CheckCircle2 } from "lucide-react"

export function RegisterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    school: "",
    contactName: "",
    contactEmail: "",
    localAuthority: "",
    role: "",
    whyJoin: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.school && formData.contactName && formData.contactEmail && formData.localAuthority) {
      try {
        await fetch("/api/registrations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        setIsSubmitted(true)
      } catch (error) {
        console.error("Failed to submit registration")
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const closeModal = () => {
    setIsSubmitted(false)
    setFormData({
      school: "",
      contactName: "",
      contactEmail: "",
      localAuthority: "",
      role: "",
      whyJoin: "",
    })
  }

  return (
    <>
      {/* Form Card - Changed background to white */}
      <div className="bg-white rounded-3xl p-6 lg:p-10 max-w-5xl mx-auto shadow-lg">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="relative flex justify-center animate-float">
            <Image
              src="/asset/children-room.png"
              alt="Child engaged in curious learning"
              width={400}
              height={450}
              className="object-cover"
            />
          </div>

          {/* Right - Form - Input backgrounds changed to light blue */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="school" className="text-[#1a237e] font-medium mb-2 block">
                Your School <span className="text-[#f5a623] italic">(required)</span>
              </Label>
              <Input
                id="school"
                name="school"
                placeholder="School name"
                value={formData.school}
                onChange={handleChange}
                required
                className="bg-[#f5f9fc] border-gray-200 rounded-lg h-12 focus:border-[#1a237e] focus:ring-[#1a237e]"
              />
            </div>

            <div>
              <Label htmlFor="contactName" className="text-[#1a237e] font-medium mb-2 block">
                Contact Name <span className="text-[#f5a623] italic">(required)</span>
              </Label>
              <Input
                id="contactName"
                name="contactName"
                placeholder="Your name"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="bg-[#f5f9fc] border-gray-200 rounded-lg h-12 focus:border-[#1a237e] focus:ring-[#1a237e]"
              />
            </div>

            <div>
              <Label htmlFor="contactEmail" className="text-[#1a237e] font-medium mb-2 block">
                Contact Email <span className="text-[#f5a623] italic">(required)</span>
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="For eg: school@gmail.com"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="bg-[#f5f9fc] border-gray-200 rounded-lg h-12 focus:border-[#1a237e] focus:ring-[#1a237e]"
              />
            </div>

            <div>
              <Label htmlFor="localAuthority" className="text-[#1a237e] font-medium mb-2 block">
                Local Authority <span className="text-[#f5a623] italic">(required)</span>
              </Label>
              <Input
                id="localAuthority"
                name="localAuthority"
                placeholder="For eg: school@gmail.com"
                value={formData.localAuthority}
                onChange={handleChange}
                required
                className="bg-[#f5f9fc] border-gray-200 rounded-lg h-12 focus:border-[#1a237e] focus:ring-[#1a237e]"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-[#1a237e] font-medium mb-2 block">
                Your Role
              </Label>
              <Input
                id="role"
                name="role"
                placeholder="For eg: (Headteacher / Deputy / Play Lead)"
                value={formData.role}
                onChange={handleChange}
                className="bg-[#f5f9fc] border-gray-200 rounded-lg h-12 focus:border-[#1a237e] focus:ring-[#1a237e]"
              />
            </div>

            <div>
              <Label htmlFor="whyJoin" className="text-[#1a237e] font-medium mb-2 block">
                Why join this award journey?
              </Label>
              <Textarea
                id="whyJoin"
                name="whyJoin"
                placeholder="E.g., We've started play-based learning in early years and want to expand across the whole school..."
                value={formData.whyJoin}
                onChange={handleChange}
                rows={4}
                className="bg-[#f5f9fc] border-gray-200 rounded-lg resize-none focus:border-[#1a237e] focus:ring-[#1a237e]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#c5e063] hover:bg-[#b8d458] text-[#1a237e] font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Register Your School
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 lg:p-10 max-w-md w-full shadow-2xl transform animate-in fade-in zoom-in duration-300 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#c5e063] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#1a237e]" />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-[#1a237e] mb-4">Thank You!</h2>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Your form has been submitted successfully. We will be in touch with you shortly for further process.
              </p>

              <Button
                onClick={closeModal}
                className="bg-[#1a237e] hover:bg-[#283593] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
