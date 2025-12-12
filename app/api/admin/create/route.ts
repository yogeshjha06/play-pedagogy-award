import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const client = await clientPromise
    const db = client.db("play_pedagogy")
    const adminsCollection = db.collection("admins")

    const result = await adminsCollection.insertOne({
      username,
      password,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 })
  }
}
