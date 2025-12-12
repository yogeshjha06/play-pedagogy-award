"use client"

import { useEffect, useState } from "react"

interface Registration {
  _id: string
  school: string
  contactName: string
  contactEmail: string
  localAuthority: string
  role: string
  whyJoin: string
  createdAt: string
}

export function RegistrationsTab() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/registrations")
      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      console.error("Failed to fetch registrations")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1a237e] mb-6">School Registration Applications</h2>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">School</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{reg.school}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{reg.contactName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{reg.contactEmail}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{reg.role}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(reg.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
