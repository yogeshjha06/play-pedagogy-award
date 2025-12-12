import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const client = await clientPromise
    const db = client.db("play_pedagogy")
    const adminsCollection = db.collection("admins")

    const admin = await adminsCollection.findOne({ username })

    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ success: true, adminId: admin._id })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
