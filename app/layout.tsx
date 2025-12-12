import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@/components/analytics"
import { FaviconHead } from "@/components/favicon-head"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Technical SEO是什么？ | Technical SEO 分享 by Meathill",
  description:
    'Technical SEO 是网站优化的"骨骼"，确保搜索引擎能轻松抓取、理解和索引你的内容。了解为什么它对网站排名至关重要。',
  keywords: "Technical SEO, 技术SEO, 网站优化, 搜索引擎优化, SEO基础, 网站排名",
  authors: [{ name: "Meathill", url: "https://seo.meathill.com" }],
  openGraph: {
    title: "Technical SEO是什么？ | Technical SEO 分享",
    description: 'Technical SEO 是网站优化的"骨骼"，确保搜索引擎能轻松抓取、理解和索引你的内容。',
    type: "article",
    locale: "zh_CN",
    images: [
      {
        url: "https://seo.meathill.com/api/og?title=Technical SEO 分享&subtitle=by%20Meathill",
        width: 1200,
        height: 630,
        alt: "SEO系列分享 by Meathill",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical SEO是什么？ | Technical SEO 分享",
    description: 'Technical SEO 是网站优化的"骨骼"，确保搜索引擎能轻松抓取、理解和索引你的内容。',
    images: ["https://seo.meathill.com/api/og?title=Technical SEO 分享&subtitle=by%20Meathill"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seo.meathill.com/seo-series/technical-seo",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <FaviconHead />
      </head>
      <body className={inter.className}>
        {children}

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Technical SEO是什么？",
              description: 'Technical SEO 是网站优化的"骨骼"，确保搜索引擎能轻松抓取、理解和索引你的内容。',
              author: {
                "@type": "Person",
                name: "Meathill",
                url: "https://seo.meathill.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Meathill SEO",
                logo: {
                  "@type": "ImageObject",
                  url: "https://seo.meathill.com/logo.png",
                },
              },
              datePublished: "2025-03-24",
              dateModified: "2025-03-24",
              image: "https://seo.meathill.com/images/technical-seo.jpg",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://seo.meathill.com/seo-series/technical-seo",
              },
            }),
          }}
        />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}
