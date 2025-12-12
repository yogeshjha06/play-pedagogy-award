import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { username, oldPassword, newPassword } = await request.json()

    if (!username || !oldPassword || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("play_pedagogy")
    const adminsCollection = db.collection("admins")

    const admin = await adminsCollection.findOne({ username })

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 })
    }

    if (admin.password !== oldPassword) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 })
    }

    await adminsCollection.updateOne({ username }, { $set: { password: newPassword } })

    return NextResponse.json({ success: true, message: "Password reset successfully" })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
