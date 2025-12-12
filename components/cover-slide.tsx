"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface CoverSlideProps {
  title: string
  subtitle: string
}

export default function CoverSlide({ title, subtitle }: CoverSlideProps) {
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
            alt="Technical SEO logo"
            width={180}
            height={180}
            className="aspect-square object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>
        <p className="text-xl text-white/70">{subtitle}</p>
      </div>

      <div className="absolute bottom-24 left-0 right-0 flex justify-center">
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/50"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
          <span className="sr-only">向下滚动</span>
        </div>
      </div>
    </motion.div>
  )
}
