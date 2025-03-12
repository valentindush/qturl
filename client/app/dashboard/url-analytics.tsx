"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import axios from "@/lib/axios"

type ClickEvent = {
  id: string
  timestamp: string
  ipAddress: string
  userAgent: string
  referer: string
}

type AnalyticsData = {
  id: string
  shortCode: string
  longUrl: string
  totalClicks: number
  createdAt: string
  clickEvents: ClickEvent[]
  dailyClicks: Record<string, number>
}

export function UrlAnalytics({ shortCode }: { shortCode: string }) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/analytics/${shortCode}`)
        const data = response.data
        setAnalyticsData(data)
      } catch (err) {
        setError("An error occurred while fetching analytics data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (shortCode) {
      fetchAnalytics()
    }
  }, [shortCode])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>
  }

  if (!analyticsData) {
    return <div className="text-center py-4">No analytics data available</div>
  }

  // Format data for the chart
  const chartData = Object.entries(analyticsData.dailyClicks).map(([date, clicks]) => ({
    date,
    clicks
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-6 w-fit">
      <div className="grid gap-4 w-fit md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalClicks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Created On</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{new Date(analyticsData.createdAt).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Destination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm truncate font-medium">{analyticsData.longUrl}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">Traffic Overview</TabsTrigger>
          <TabsTrigger value="events">Click Events</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Daily Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                      <XAxis 
                        dataKey="date" 
                        angle={-45} 
                        textAnchor="end"
                        tick={{ fontSize: 12 }}
                        height={60}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} clicks`, 'Clicks']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Bar dataKey="clicks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No daily click data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Click Events</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.clickEvents.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead className="hidden lg:table-cell">User Agent</TableHead>
                        <TableHead className="hidden md:table-cell">Referer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analyticsData.clickEvents.map((event) => {
                        const date = new Date(event.timestamp)
                        return (
                          <TableRow key={event.id}>
                            <TableCell>{date.toLocaleDateString()}</TableCell>
                            <TableCell>{date.toLocaleTimeString()}</TableCell>
                            <TableCell>{event.ipAddress}</TableCell>
                            <TableCell className="hidden lg:table-cell max-w-xs truncate">{event.userAgent}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-xs truncate">{event.referer || "Direct"}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No click events recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}