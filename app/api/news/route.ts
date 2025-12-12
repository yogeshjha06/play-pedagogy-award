import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
    ])
    const db = (client as any).db("play_pedagogy")
    const news = await db.collection("news").find({}).toArray()
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, content, thumbnail, link, type } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    const result = await db.collection("news").insertOne({
      title,
      description,
      content,
      thumbnail,
      link,
      type,
      createdAt: new Date(),
    })
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add news" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, description, content, thumbnail, link, type } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    await db.collection("news").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, content, thumbnail, link, type } }
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    await db.collection("news").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
  }
}
