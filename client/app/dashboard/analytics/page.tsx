"use client"

import { useEffect, useState } from "react"
import { useUrl } from "@/contexts/url-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export default function AnalyticsPage() {
    const { getSummaryAnalytics } = useUrl()
    const [analytics, setAnalytics] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getSummaryAnalytics()
                setAnalytics(data)
            } catch (err) {
                setError("Failed to load analytics data")
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [getSummaryAnalytics])

    if (loading) {
        return (
            <div className="container flex justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-8">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }


    const topUrlsData = analytics?.topUrls
        ? analytics.topUrls
            .map((url: any) => ({
                shortCode: url.shortCode,
                clicks: url.clicks,
            }))
            .sort((a: any, b: any) => b.clicks - a.clicks)
            .slice(0, 5)
        : []

    return (
        <div className="container py-8">
            <h1 className="mb-6 text-3xl font-bold">Analytics Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Total URLs</CardTitle>
                        <CardDescription>Number of URLs shortened</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <div className="text-5xl font-bold">{analytics?.totalUrls || 0}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Total Clicks</CardTitle>
                        <CardDescription>Total number of redirects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <div className="text-5xl font-bold">{analytics?.totalClicks || 0}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Average Clicks</CardTitle>
                        <CardDescription>Average clicks per URL</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <div className="text-5xl font-bold">
                                {analytics?.totalUrls ? Math.round((analytics.totalClicks / analytics.totalUrls) * 10) / 10 : 0}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Clicks</CardTitle>
                        <CardDescription>Click distribution over time</CardDescription>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top URLs</CardTitle>
                        <CardDescription>Most clicked shortened URLs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topUrlsData.length > 0 ? (
                            <div className="h-[300px]">
                               
                            </div>
                        ) : (
                            <div className="flex justify-center py-8 text-center">
                                <div>
                                    <p className="text-muted-foreground">No URL data available yet</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
