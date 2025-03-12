"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import axios from "@/lib/axios"

export interface UrlData {
    id: string
    shortCode: string
    longUrl: string
    clicks: number
    createdAt: string
    userId: string
}

export interface AnalyticsData {
    id: string
    shortCode: string
    longUrl: string
    totalClicks: number
    createdAt: string
    clickEvents: {
        id: string
        timestamp: string
        ipAddress: string
        userAgent: string
        referer: string
    }[]
    dailyClicks: Record<string, number>
}

interface UrlContextType {
    urls: UrlData[]
    loading: boolean
    error: string | null
    fetchUrls: () => Promise<void>
    shortenUrl: (longUrl: string) => Promise<UrlData>
    getUrlAnalytics: (shortCode: string) => Promise<AnalyticsData>
    getSummaryAnalytics: () => Promise<any>
}

const UrlContext = createContext<UrlContextType | undefined>(undefined)

export const UrlProvider = ({ children }: { children: React.ReactNode }) => {
    const [urls, setUrls] = useState<UrlData[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUrls = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get("/urls")
            setUrls(response.data)
        } catch (err) {
            setError("Failed to fetch URLs")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const shortenUrl = async (longUrl: string): Promise<UrlData> => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post("/shorten", { longUrl })
            const newUrl = response.data
            setUrls((prevUrls) => [newUrl, ...prevUrls])
            return newUrl
        } catch (err) {
            setError("Failed to shorten URL")
            console.error(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const getUrlAnalytics = async (shortCode: string): Promise<AnalyticsData> => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(`/analytics/${shortCode}`)
            return response.data
        } catch (err) {
            setError("Failed to fetch analytics")
            console.error(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const getSummaryAnalytics = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get("/analytics/all")
            return response.data
        } catch (err) {
            setError("Failed to fetch summary analytics")
            console.error(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return (
        <UrlContext.Provider
            value={{
                urls,
                loading,
                error,
                fetchUrls,
                shortenUrl,
                getUrlAnalytics,
                getSummaryAnalytics,
            }}
        >
            {children}
        </UrlContext.Provider>
    )
}

export const useUrl = () => {
    const context = useContext(UrlContext)
    if (context === undefined) {
        throw new Error("useUrl must be used within a UrlProvider")
    }
    return context
}

