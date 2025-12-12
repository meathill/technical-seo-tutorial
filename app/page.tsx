import Link from "next/link"
import { dayInfo } from "@/lib/slide-utils"

export default function Home() {
  // Use a simple static rendering approach without data fetching
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Technical SEO 分享</h1>
        <p className="text-xl mb-8">由 Meathill 精心制作</p>

        <div className="space-y-4">
          {dayInfo.map((day) => (
            <div key={day.day}>
              <Link
                href={`/${day.slug}`}
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full text-left"
              >
                <span className="inline-block w-8 h-8 bg-white/10 rounded-full text-center mr-3 leading-8">
                  {day.day}
                </span>
                {day.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
