"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Download, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import CoverSlide from "@/components/cover-slide"
import ContentSlide from "@/components/content-slide"
import EndSlide from "@/components/end-slide"
import { Sidebar } from "@/components/sidebar"
import type { SlideData } from "@/lib/slide-utils"
import { getPrevDaySlug, getNextDaySlug } from "@/lib/slide-utils"
import { downloadCanvasSlides } from "@/lib/canvas-slides"
import { trackEvent } from "@/lib/analytics"

interface SlideDeckProps {
  slideData: SlideData
}

export default function SlideDeck({ slideData }: SlideDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  // Ensure slideData is properly defined
  if (!slideData || !slideData.slides || !Array.isArray(slideData.slides) || slideData.slides.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">加载幻灯片时出错</h1>
          <p>无法加载幻灯片内容，请返回首页重试。</p>
          <Link
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const { slides, day } = slideData

  // Ensure currentSlide is within bounds
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0)
    }
  }, [currentSlide, slides.length])

  // Get previous and next day slugs
  const prevDaySlug = getPrevDaySlug(day)
  const nextDaySlug = getNextDaySlug(day)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      trackEvent({
        name: "slide_navigation",
        properties: {
          direction: "next",
          slideIndex: currentSlide + 1,
          slideDeck: slideData.slug,
        },
      })
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      trackEvent({
        name: "slide_navigation",
        properties: {
          direction: "previous",
          slideIndex: currentSlide - 1,
          slideDeck: slideData.slug,
        },
      })
    }
  }

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }

    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide])

  // Reset current slide when slide deck changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [slideData.slug])

  // Handle download of all slides as images
  const handleDownload = async () => {
    if (isDownloading) return

    try {
      setIsDownloading(true)
      trackEvent({
        name: "slides_download",
        properties: {
          slideDeck: slideData.slug,
          slideCount: slides.length,
        },
      })
      await downloadCanvasSlides(slideData)
    } catch (error) {
      console.error("Error downloading slides:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  // Track day navigation
  const handleDayNavigation = (direction: "prev" | "next") => {
    trackEvent({
      name: "day_navigation",
      properties: {
        direction,
        fromDay: day,
        toDay: direction === "prev" ? day - 1 : day + 1,
      },
    })
  }

  // Ensure we have a valid current slide
  const currentSlideData = slides[currentSlide]
  if (!currentSlideData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">幻灯片数据错误</h1>
          <p>无法显示当前幻灯片，请返回首页重试。</p>
          <Link
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentDay={day} />

      {/* Main content */}
      <div
        className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-full w-full">
          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="absolute top-4 right-4 z-10 p-2 rounded-md bg-slate-800/80 backdrop-blur-sm transition-all hover:bg-slate-700/80 disabled:opacity-50"
            aria-label="Download slides as images"
            title="下载所有幻灯片为图片"
          >
            <Download className="h-5 w-5 text-white" />
          </button>

          {/* Day navigation buttons */}
          <div className="absolute top-4 left-16 z-10 flex gap-2">
            {prevDaySlug && (
              <Link
                href={`/${prevDaySlug}`}
                onClick={() => handleDayNavigation("prev")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-800/80 backdrop-blur-sm transition-all hover:bg-slate-700/80 text-sm"
                aria-label="Previous day"
                title="上一天"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">上一天</span>
              </Link>
            )}

            {nextDaySlug && (
              <Link
                href={`/${nextDaySlug}`}
                onClick={() => handleDayNavigation("next")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-800/80 backdrop-blur-sm transition-all hover:bg-slate-700/80 text-sm"
                aria-label="Next day"
                title="下一天"
              >
                <span className="hidden sm:inline">下一天</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Slide content */}
          <div className="h-full w-full flex items-center justify-center">
            {currentSlideData.type === "cover" && (
              <CoverSlide title={currentSlideData.title} subtitle={currentSlideData.subtitle || ""} />
            )}

            {currentSlideData.type === "content" && (
              <ContentSlide title={currentSlideData.title} content={currentSlideData.content || ""} />
            )}

            {currentSlideData.type === "end" && (
              <EndSlide
                name={currentSlideData.name || "Meathill"}
                title={currentSlideData.title}
                message={currentSlideData.message}
                isGeneratingImage={isDownloading}
              />
            )}
          </div>

          {/* Navigation controls */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm disabled:opacity-30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="text-sm">
              {currentSlide + 1} / {slides.length}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm disabled:opacity-30"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
