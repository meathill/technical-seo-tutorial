"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface EndSlideProps {
  name: string
  title: string
  message?: string
  contact?: string
  isGeneratingImage?: boolean
}

export default function EndSlide({ name, title, message, contact, isGeneratingImage = false }: EndSlideProps) {
  // Function to handle sharing
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`${message || name + " - " + title}`)

    // Track share event
    trackEvent({
      name: "content_share",
      properties: {
        platform,
        content: window.location.pathname,
      },
    })

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "copy":
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => alert("链接已复制到剪贴板"))
          .catch((err) => console.error("复制失败:", err))
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md px-6 py-12 text-center"
    >
      <div className="mb-8">
        <div className="inline-block mb-6">
          <Image
            src="/images/logo.png"
            alt={`${name} - ${title}`}
            width={180}
            height={180}
            className="aspect-square object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-white/70 mb-6">{title}</p>

        <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>

        {message && <p className="text-lg text-white/90 mb-4 italic">"{message}"</p>}

        <p className="text-sm text-white/50">感谢您的关注</p>

        {/* Share buttons - hidden when generating images */}
        {!isGeneratingImage && (
          <div className="mt-8 flex justify-center space-x-4" data-no-capture="true">
            <button
              onClick={() => handleShare("twitter")}
              className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
              aria-label="分享到 Twitter"
            >
              <Twitter className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
              aria-label="分享到 Facebook"
            >
              <Facebook className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
              aria-label="分享到 LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
              aria-label="复制链接"
            >
              <Link2 className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
