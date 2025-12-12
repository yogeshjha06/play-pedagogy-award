import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("play_pedagogy")
    const users = await db.collection("users").find({}).toArray()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { registrationId, username, tempPassword } = await request.json()
    const client = await clientPromise
    const db = client.db("play_pedagogy")
    const result = await db.collection("users").insertOne({
      registrationId,
      username,
      tempPassword,
      createdAt: new Date(),
    })
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, username, tempPassword } = await request.json()
    const client = await clientPromise
    const db = client.db("play_pedagogy")
    await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { username, tempPassword } }
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
