import fs from "fs"
import path from "path"
import type { SlideData } from "./slide-utils"

// Function to read slide data directly from the file system with better error handling
export async function readSlideDataFromFile(day: number): Promise<SlideData | null> {
  try {
    const filePath = path.join(process.cwd(), "data", `day${day}.json`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Slide data file not found: ${filePath}`)
      return null
    }

    // Read and parse the JSON file
    const fileContent = fs.readFileSync(filePath, "utf8")
    try {
      return JSON.parse(fileContent) as SlideData
    } catch (parseError) {
      console.error(`Error parsing JSON for day ${day}:`, parseError)
      return null
    }
  } catch (error) {
    console.error(`Error reading slide data for day ${day}:`, error)
    return null
  }
}

// Function to get slide data by day
export async function getSlideDataByDayServer(day: number): Promise<SlideData | null> {
  return readSlideDataFromFile(day)
}

// Function to get slide data by slug with improved error handling
export async function getSlideDataBySlugServer(slug: string): Promise<SlideData | null> {
  try {
    // Extract day from slug (assuming format like day1-xxx)
    const dayMatch = slug.match(/^day(\d+)-/)
    if (!dayMatch) {
      console.error(`Invalid slug format: ${slug}`)
      return null
    }

    const day = Number.parseInt(dayMatch[1], 10)
    if (isNaN(day)) {
      console.error(`Invalid day number in slug: ${slug}`)
      return null
    }

    return getSlideDataByDayServer(day)
  } catch (error) {
    console.error(`Error getting slide data for slug ${slug}:`, error)
    return null
  }
}
