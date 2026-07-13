import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Define the path to our local JSON database
const DATA_FILE = path.join(process.cwd(), 'data', 'rsvps.json')

// Helper to read the current data
function getRsvps() {
  if (!fs.existsSync(DATA_FILE)) {
    return []
  }
  const data = fs.readFileSync(DATA_FILE, 'utf8')
  return data ? JSON.parse(data) : []
}

// GET: Fetch all RSVPs (for Admin Dashboard)
export async function GET() {
  try {
    const rsvps = getRsvps()
    return NextResponse.json(rsvps)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

// POST: Submit a new RSVP (from Invitation Flow)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newRsvp = {
      id: Date.now().toString(),
      name: body.name || 'Anonymous',
      status: body.status || 'Unknown', // YES or NO
      note: body.note || '',
      timestamp: new Date().toISOString(),
    }

    const rsvps = getRsvps()
    rsvps.push(newRsvp)

    // Ensure the data directory exists
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2))

    return NextResponse.json({ success: true, data: newRsvp })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
