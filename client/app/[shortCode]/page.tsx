import { redirect } from "next/navigation"
import axios from "axios"

export default async function ShortUrlRedirect({
  params,
}: {
  params: Promise<{ shortCode: string }>
}) {
  const { shortCode } = await params

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${shortCode}`)

    // Redirect to the original URL
    redirect(response.data.longUrl)
  } catch (error) {
    redirect("/")
  }

  return null
}