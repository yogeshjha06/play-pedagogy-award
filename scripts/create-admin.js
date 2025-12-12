const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://playpedagogyawards_db_user:x744LttONB5LNQPR@play.v0fdqza.mongodb.net/?appName=play"

async function createAdmin() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db("play_pedagogy")
    const adminsCollection = db.collection("admins")

    const admin = {
      username: "yogesh",
      password: "Yogesh123",
      createdAt: new Date(),
    }

    const result = await adminsCollection.insertOne(admin)
    console.log("Admin created successfully!")
    console.log("Username: yogesh")
    console.log("Password: Yogesh123")
    console.log("Admin ID:", result.insertedId)
  } catch (error) {
    console.error("Error creating admin:", error)
  } finally {
    await client.close()
  }
}

createAdmin()
