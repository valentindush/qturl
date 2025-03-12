import { redirect } from "next/navigation"
import axios from "axios"

interface Props {
    params: {
        shortCode: string
    }
}

export default async function ShortUrlRedirect({ params }: Props) {
    const { shortCode } = params

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${shortCode}`)

        // Redirect to the original URL
        redirect(response.data.longUrl)
    } catch (error) {
        redirect("/")
    }

    //fallback
    return null
}
