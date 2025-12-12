import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    const messages = await db.collection("messages").find({}).toArray()
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, message } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    const result = await db.collection("messages").insertOne({
      userId,
      message,
      createdAt: new Date(),
      replies: [],
    })
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, reply } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    await db.collection("messages").updateOne(
      { _id: new ObjectId(id) },
      { $push: { replies: { text: reply, createdAt: new Date() } } } as any
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add reply" }, { status: 500 })
  }
}
