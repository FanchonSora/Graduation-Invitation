import { NextResponse } from 'next/server'
import clientPromise from '~/libs/mongodb'

// The collection name
const COLLECTION_NAME = 'rsvps'

// GET: Fetch all RSVPs (for Admin Dashboard)
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const collection = db.collection(COLLECTION_NAME)
    
    // Fetch all documents from the collection
    const rsvps = await collection.find({}).toArray()
    
    // Map _id to id to match the expected format
    const formattedRsvps = rsvps.map(rsvp => ({
      ...rsvp,
      id: rsvp._id.toString(),
      _id: undefined
    }))

    return NextResponse.json(formattedRsvps)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

// POST: Submit a new RSVP (from Invitation Flow)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newRsvp = {
      name: body.name || 'Anonymous',
      status: body.status || 'Unknown', // YES or NO
      note: body.note || '',
      timestamp: new Date().toISOString(),
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const collection = db.collection(COLLECTION_NAME)

    // Insert the new RSVP
    const result = await collection.insertOne(newRsvp)

    return NextResponse.json({ 
      success: true, 
      data: { ...newRsvp, id: result.insertedId.toString() } 
    })
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
