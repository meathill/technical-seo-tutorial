import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllSlugs, getSlideDataBySlug } from "@/lib/slide-utils"
import { getSlideDataBySlugServer } from "@/lib/slide-data-server"
import SlideDeck from "@/components/slide-deck"

// Generate static params for all slide decks
export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for each slide deck with better error handling
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const slideData = await getSlideDataBySlugServer(slug)

    if (!slideData) {
      return {
        title: "Page Not Found",
        description: "The requested slide deck could not be found.",
      }
    }

    const title = `${slideData.title} | Technical SEO 分享 by Meathill`
    const ogImageUrl = `/api/og?title=${encodeURIComponent(slideData.title)}&subtitle=${encodeURIComponent(slideData.description)}`

    return {
      title: title,
      description: slideData.description,
      keywords: "Technical SEO, 技术SEO, 网站优化, 搜索引擎优化, SEO基础, 网站排名",
      authors: [{ name: "Meathill", url: "https://seo.meathill.com" }],
      openGraph: {
        title: title,
        description: slideData.description,
        type: "article",
        locale: "zh_CN",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: slideData.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: slideData.description,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: `/${slug}`,
      },
    }
  } catch (error) {
    console.error(`Error generating metadata for slug ${slug}:`, error)
    return {
      title: "Error",
      description: "An error occurred while loading this page.",
    }
  }
}

export default async function SlidedeckPage({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    // Use the updated getSlideDataBySlug function which handles SSR correctly
    const slideData = await getSlideDataBySlug(slug)

    // If the slide deck doesn't exist, show 404
    if (!slideData) {
      notFound()
    }

    return <SlideDeck slideData={slideData} />
  } catch (error) {
    console.error(`Error rendering slide deck for slug ${params.slug}:`, error)
    notFound()
  }
}
