import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get title from query params or use default
    const title = searchParams.get("title") || "Technical SEO 分享"
    const subtitle = searchParams.get("subtitle") || "by Meathill"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #334155 2%, transparent 0%), radial-gradient(circle at 75px 75px, #334155 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "40px",
        }}
      >
        {/* Blue gradient circle in background */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)",
            zIndex: 0,
            filter: "blur(40px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <img
            src={new URL("/favicon/favicon.png", request.url).toString() || "/placeholder.svg"}
            alt="Technical SEO Logo"
            width={150}
            height={150}
            style={{
              marginBottom: "32px",
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: "48px",
              fontFamily: "Inter",
              fontWeight: "bold",
              color: "white",
              marginBottom: "16px",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              fontFamily: "Inter",
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            {subtitle}
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontFamily: "Inter",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              seo.meathill.com
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error(e)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
