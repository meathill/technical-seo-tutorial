import { cache } from "react"

export interface Slide {
  type: "cover" | "content" | "end"
  title: string
  subtitle?: string
  content?: string
  name?: string
  message?: string
}

export interface SlideData {
  day: number
  title: string
  slug: string
  description: string
  slides: Slide[]
}

// Update the dayInfo array to include the new Day 6 and renumbered Day 7
export const dayInfo = [
  { day: 1, title: "Technical SEO是什么？", slug: "day1-what-is-technical-seo" },
  { day: 2, title: "网站速度有多重要？", slug: "day2-website-speed" },
  { day: 3, title: "移动端优化：SEO的重要一环", slug: "day3-mobile-optimization" },
  { day: 4, title: "Web Vitals 及 CrUX 的重要性", slug: "day4-web-vitals" },
  { day: 5, title: "应该什么时候开始 Technical SEO？", slug: "day5-when-to-start-technical-seo" },
  { day: 6, title: "Technical SEO 要做多久？", slug: "day6-technical-seo-timeline" },
  { day: 7, title: "实战第一步：Google Search Console", slug: "day7-google-search-console" },
]

// Get day number from slug
export function getDayFromSlug(slug: string): number | null {
  const dayItem = dayInfo.find((item) => item.slug === slug)
  return dayItem ? dayItem.day : null
}

// Get slug from day number
export function getSlugFromDay(day: number): string | null {
  const dayItem = dayInfo.find((item) => item.day === day)
  return dayItem ? dayItem.slug : null
}

// Get the slug of the previous day's slide deck
export function getPrevDaySlug(currentDay: number): string | null {
  if (!currentDay || currentDay <= 1) return null
  return getSlugFromDay(currentDay - 1)
}

// Get the slug of the next day's slide deck
export function getNextDaySlug(currentDay: number): string | null {
  if (!currentDay || currentDay >= dayInfo.length) return null
  return getSlugFromDay(currentDay + 1)
}

// Cached function to fetch slide data by day - with improved error handling
export const getSlideDataByDay = cache(async (day: number): Promise<SlideData | null> => {
  try {
    // Check if we're running on the server
    if (typeof window === "undefined") {
      // We're on the server, directly use the server data fetching method
      const { getSlideDataByDayServer } = require("./slide-data-server")
      return getSlideDataByDayServer(day)
    }

    // We're in the browser, use the API endpoint with absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
    const url = `${baseUrl}/api/slides/${day}`

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch slide data for day ${day}: ${response.status}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching slide data for day ${day}:`, error)
    return null
  }
})

// Cached function to fetch slide data by slug
export const getSlideDataBySlug = cache(async (slug: string): Promise<SlideData | null> => {
  try {
    const day = getDayFromSlug(slug)
    if (!day) return null

    // Check if we're running on the server
    if (typeof window === "undefined") {
      // We're on the server, directly use the server data fetching method
      const { getSlideDataBySlugServer } = require("./slide-data-server")
      return getSlideDataBySlugServer(slug)
    }

    return getSlideDataByDay(day)
  } catch (error) {
    console.error(`Error getting slide data for slug ${slug}:`, error)
    return null
  }
})

// Get all slugs for static generation
export function getAllSlugs(): string[] {
  return dayInfo.map((item) => item.slug)
}
