import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("play_pedagogy")
    const registrations = await db.collection("registrations").find({}).toArray()
    return NextResponse.json(registrations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const client = await clientPromise
    const db = client.db("play_pedagogy")
    const result = await db.collection("registrations").insertOne({
      ...data,
      createdAt: new Date(),
    })
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save registration" }, { status: 500 })
  }
}
