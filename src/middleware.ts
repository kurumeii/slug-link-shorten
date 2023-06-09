import { type Link } from "@prisma/client"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Get pathname:
  const slug = req.nextUrl.pathname.split("/").pop()
  if (!slug) return NextResponse.redirect(req.nextUrl.origin)
  // Get data from query:
  const data = await fetch(`${req.nextUrl.origin}/api/url/${slug}`)

  // Return (/) if not found (404):
  if (data.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin)
  }
  // Convert data to JSON:
  const dataToJson = (await data.json()) as Link

  if (data?.url) {
    return NextResponse.redirect(new URL(dataToJson.url))
  }
}

export const config = {
  matcher: "/s/:slug*",
}
