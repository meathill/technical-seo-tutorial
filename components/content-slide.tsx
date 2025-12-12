"use client"

import { motion } from "framer-motion"

interface ContentSlideProps {
  title: string
  content: string
}

export default function ContentSlide({ title, content }: ContentSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md px-6 py-12"
    >
      <div className="mb-6">
        <div className="h-1.5 w-12 bg-primary mb-6"></div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <div className="prose prose-invert">
          <p className="text-lg leading-relaxed text-white/80 text-pretty whitespace-pre-wrap">{content}</p>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
    </motion.div>
  )
}
