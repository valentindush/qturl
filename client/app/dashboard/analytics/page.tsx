"use client"

import { useEffect, useState } from "react"
import { useUrl } from "@/contexts/url-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, LinkIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import axios from "@/lib/axios"

export default function AnalyticsPage() {
    const { getSummaryAnalytics } = useUrl()
    const [analytics, setAnalytics] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [urlData, setUrlData] = useState<any[]>([])

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getSummaryAnalytics()
                setAnalytics(data)
                
                // Fetch URL data from the API
                const response = await axios.get('/analytics/all')
                setUrlData(response.data)
            } catch (err) {
                setError("Failed to load analytics data")
                console.error(err)
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

    // Process data for charts
    const topUrlsData = urlData
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5)
        .map(url => ({
            name: url.shortCode,
            clicks: url.clicks,
            longUrl: url.longUrl
        }))

    // Prepare daily clicks data
    // Group by date and count clicks
    const dailyClicksMap = new Map()
    
    urlData.forEach(url => {
        const date = new Date(url.createdAt).toLocaleDateString()
        if (!dailyClicksMap.has(date)) {
            dailyClicksMap.set(date, 0)
        }
        dailyClicksMap.set(date, dailyClicksMap.get(date) + url.clicks)
    })

    const dailyClicksData = Array.from(dailyClicksMap.entries()).map(([date, clicks]) => ({
        date,
        clicks
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
                            <div className="text-5xl font-bold">{urlData.length || 0}</div>
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
                            <div className="text-5xl font-bold">
                                {urlData.reduce((sum, url) => sum + url.clicks, 0) || 0}
                            </div>
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
                                {urlData.length 
                                    ? Math.round((urlData.reduce((sum, url) => sum + url.clicks, 0) / urlData.length) * 10) / 10 
                                    : 0}
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
                        {dailyClicksData.length > 0 ? (
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={dailyClicksData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="clicks" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex justify-center py-8 text-center">
                                <div>
                                    <p className="text-muted-foreground">No click data available yet</p>
                                </div>
                            </div>
                        )}
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
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={topUrlsData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                        layout="vertical"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="name" width={80} />
                                        <Tooltip 
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="bg-white p-2 border rounded shadow">
                                                            <p><strong>Code:</strong> {data.name}</p>
                                                            <p><strong>Clicks:</strong> {data.clicks}</p>
                                                            <p className="text-xs truncate max-w-xs">
                                                                <strong>URL:</strong> {data.longUrl}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar dataKey="clicks" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
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