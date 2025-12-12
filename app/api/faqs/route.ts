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
    const faqs = await db.collection("faqs").find({}).toArray()
    return NextResponse.json(faqs)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, answer } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    const result = await db.collection("faqs").insertOne({ question, answer })
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add FAQ" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, question, answer } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    await db.collection("faqs").updateOne({ _id: new ObjectId(id) }, { $set: { question, answer } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const client = await clientPromise
    const db = (client as any).db("play_pedagogy")
    await db.collection("faqs").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 })
  }
}
