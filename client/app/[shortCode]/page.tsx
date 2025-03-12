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
        const response = await axios.get(`http://localhost:3001/api/v1/${shortCode}`)

        // Redirect to the original URL
        redirect(response.data.longUrl)
    } catch (error) {
        redirect("/")
    }

    //fallback
    return null
}
