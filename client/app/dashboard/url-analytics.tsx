"use client"

import { useEffect, useState } from "react"
import { useUrl, type AnalyticsData } from "@/contexts/url-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface UrlAnalyticsProps {
    shortCode: string
}

export function UrlAnalytics({ shortCode }: UrlAnalyticsProps) {
    const { getUrlAnalytics } = useUrl()
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getUrlAnalytics(shortCode)
                setAnalytics(data)
            } catch (err) {
                setError("Failed to load analytics data")
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [shortCode, getUrlAnalytics])

    // Format data for chart
    const chartData = analytics
        ? Object.entries(analytics.dailyClicks)
            .map(([date, clicks]) => ({
                date,
                clicks,
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : []

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    if (!analytics) {
        return (
            <Alert>
                <AlertDescription>No analytics data available</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>URL Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Short URL:</span>
                                <div className="flex items-center">
                                    <a
                                        href={`http://localhost:3001/${analytics.shortCode}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {`localhost:3001/${analytics.shortCode}`}
                                        <ExternalLink className="ml-1 inline h-3 w-3" />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Original URL:</span>
                                <div className="break-all">{analytics.longUrl}</div>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Created:</span>
                                <div>{new Date(analytics.createdAt).toLocaleString()}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <div className="text-5xl font-bold">{analytics.totalClicks}</div>
                            <div className="mt-1 text-sm text-muted-foreground">Total Clicks</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="chart">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chart">Click History</TabsTrigger>
                    <TabsTrigger value="events">Click Events</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Click History</CardTitle>
                            <CardDescription>Click distribution over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {chartData.length > 0 ? (
                                <div className="h-[300px]">
                                    
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
                </TabsContent>
                <TabsContent value="events" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Click Events</CardTitle>
                            <CardDescription>Detailed information about each click</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {analytics.clickEvents.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>IP Address</TableHead>
                                                <TableHead className="hidden md:table-cell">User Agent</TableHead>
                                                <TableHead className="hidden md:table-cell">Referrer</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {analytics.clickEvents.map((event) => (
                                                <TableRow key={event.id}>
                                                    <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
                                                    <TableCell>{event.ipAddress}</TableCell>
                                                    <TableCell className="hidden max-w-xs truncate md:table-cell">{event.userAgent}</TableCell>
                                                    <TableCell className="hidden max-w-xs truncate md:table-cell">
                                                        {event.referer || "Direct"}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="flex justify-center py-8 text-center">
                                    <div>
                                        <p className="text-muted-foreground">No click events recorded yet</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}