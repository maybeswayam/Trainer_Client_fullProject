import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "tracker-data.json")

function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return null
  }
  return JSON.parse(fs.readFileSync(dataFilePath, "utf8"))
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8")
}

export async function GET() {
  const data = readData()
  if (!data) {
    return NextResponse.json({ success: false, message: "No data found" }, { status: 404 })
  }
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    writeData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving data" }, { status: 500 })
  }
}