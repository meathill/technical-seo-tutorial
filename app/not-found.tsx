import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
        <p className="mb-8">抱歉，您请求的页面不存在。</p>
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
