"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUrl } from "@/contexts/url-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, LinkIcon, Copy, ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UrlAnalytics } from "./url-analytics"
import { toast } from "sonner"

const urlSchema = z.object({
    longUrl: z.string().url("Please enter a valid URL"),
})

type UrlFormValues = z.infer<typeof urlSchema>

export default function DashboardPage() {
    const { urls, loading, error, fetchUrls, shortenUrl } = useUrl()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UrlFormValues>({
        resolver: zodResolver(urlSchema),
    })

    useEffect(() => {
        fetchUrls()
    }, [fetchUrls])

    const onSubmit = async (data: UrlFormValues) => {
        setIsSubmitting(true)
        try {
            await shortenUrl(data.longUrl)
            reset()
            toast("URL shortened successfully", { description: "Your URL has been shortened and is ready to use.", })
        } catch (err) {
            toast("Failed to shorten URL", { description: "There was an error shortening your URL. Please try again.", })
        } finally {
            setIsSubmitting(false)
        }
    }

    const copyToClipboard = (shortCode: string) => {
        const shortUrl = `http://localhost:3001/${shortCode}`
        navigator.clipboard.writeText(shortUrl)
        toast("URL copied to clipboard", { description: "The shortened URL has been copied to your clipboard.", })
    }

    return (
        <div className=" py-8">
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Shorten a URL</CardTitle>
                        <CardDescription>Enter a long URL to create a shortened version</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                        >
                            <div className="flex-1">
                                <Input
                                    placeholder="https://example.com/very/long/url"
                                    {...register("longUrl")}
                                    disabled={isSubmitting}
                                />
                                {errors.longUrl && <p className="mt-1 text-sm text-red-500">{errors.longUrl.message}</p>}
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Shortening
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon className="mr-2 h-4 w-4" /> Shorten
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Your URLs</CardTitle>
                        <CardDescription>Manage your shortened URLs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : urls.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <LinkIcon className="mb-2 h-12 w-12 text-muted-foreground" />
                                <h3 className="text-lg font-medium">No URLs yet</h3>
                                <p className="text-sm text-muted-foreground">Shorten your first URL using the form above.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Short URL</TableHead>
                                            <TableHead className="hidden md:table-cell">Original URL</TableHead>
                                            <TableHead>Clicks</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {urls.map((url) => (
                                            <TableRow key={url.id}>
                                                <TableCell className="font-medium">
                                                    <a
                                                        href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${url.shortCode}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-primary hover:underline"
                                                    >
                                                        {url.shortCode}
                                                        <ExternalLink className="ml-1 h-3 w-3" />
                                                    </a>
                                                </TableCell>
                                                <TableCell className="hidden max-w-xs truncate md:table-cell">{url.longUrl}</TableCell>
                                                <TableCell>{url.clicks}</TableCell>
                                                <TableCell>{new Date(url.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => copyToClipboard(url.shortCode)}
                                                            title="Copy URL"
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => setSelectedUrl(url.shortCode)}
                                                                    title="View Analytics"
                                                                >
                                                                    <LinkIcon className="h-4 w-4" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-3xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>URL Analytics</DialogTitle>
                                                                </DialogHeader>
                                                                {selectedUrl && <UrlAnalytics shortCode={selectedUrl} />}
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}