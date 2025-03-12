import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Globe, ChevronDown, LinkIcon, ArrowRight } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top banner */}
      <div className="bg-blue-100 py-3 px-4 text-center text-sm">
        <div className="container mx-auto">
          <p>
            <span className="mr-2 inline-block rounded bg-[#0f1c2e] px-1.5 py-0.5 text-xs font-bold text-white">
              NEW
            </span>
            <span className="text-[#0f1c2e] font-bold">Explore innovative ways to connect! Dive into our{" "}</span>
            <Link href="#" className="font-bold text-[#0f1c2e] underline">
              QR Code Inspiration Gallery
            </Link>{" "}
            today.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-[#0f1c2e] py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="mr-4 font-bold text-lg">
              QT URLz
            </Link>
            <nav className="hidden space-x-6 md:flex">
              <div className="group">
                <button className="flex items-center text-white hover:text-gray-300">
                  Platform
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-8  top-[5.5rem] z-50 mt-1 hidden w-[calc(100vw-3rem)] transform rounded-lg bg-white p-6 shadow-lg group-hover:block ">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="col-span-2">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">PRODUCTS</h3>
                      <div className="grid gap-6 border-b border-gray-100 pb-6 md:grid-cols-2">
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <LinkIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">URL Shortener</h4>
                            <p className="text-sm text-gray-600">Customize, share and track links</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                              <rect x="9" y="9" width="6" height="6" fill="currentColor" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">QR Code Generator</h4>
                            <p className="text-sm text-gray-600">Dynamic solutions to fit every business need</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">2D Barcodes</h4>
                            <p className="text-sm text-gray-600">
                              Add a Global Trade Number (GTIN) to QR Codes designed for packaging
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <path
                                d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">Analytics</h4>
                            <p className="text-sm text-gray-600">A central place to track and analyze performance</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                              <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">Pages</h4>
                            <p className="text-sm text-gray-600">Mobile-friendly, no-code landing pages</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="mb-4 mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        FEATURES
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">Link-in-bio</h4>
                            <p className="text-sm text-gray-600">
                              Curate and track links and content for social media profiles
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <path d="M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">Branded Links</h4>
                            <p className="text-sm text-gray-600">Customize links with your brand's URL</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                              <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">Mobile Links</h4>
                            <p className="text-sm text-gray-600">Short links for SMS messages</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M6 11H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M11 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">UTM Campaigns</h4>
                            <p className="text-sm text-gray-600">Track links and QR Codes with UTM parameters</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                              <path
                                d="M8 14C8 12.3431 9.34315 11 11 11H13C14.6569 11 16 12.3431 16 14V14H8V14Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0f1c2e]">Digital Business Cards</h4>
                            <p className="text-sm text-gray-600">Grow your network with virtual business cards</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        INTEGRATIONS
                      </h3>
                      <div className="grid gap-4">
                        <div className="rounded border border-gray-200 p-4">
                          <div className="mb-2 h-10 w-10">
                            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-orange-500">
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                fill="currentColor"
                                fillOpacity="0.2"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M7 12L10 15L17 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="font-medium text-[#0f1c2e]">Bitly HubSpot Connector</p>
                        </div>
                        <div className="rounded border border-gray-200 p-4">
                          <div className="mb-2 h-10 w-10">
                            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-blue-500">
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                fill="currentColor"
                                fillOpacity="0.2"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <p className="font-medium text-[#0f1c2e]">Bitly + Canva Integration</p>
                        </div>
                        <a
                          href="#"
                          className="mt-2 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          See all integrations
                          <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12H19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5L19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>

                      <h3 className="mb-4 mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        DISCOVER MORE
                      </h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-center font-medium text-[#0f1c2e] hover:text-blue-600">
                          API & Documentation
                          <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12H19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5L19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                        <a href="#" className="flex items-center font-medium text-[#0f1c2e] hover:text-blue-600">
                          Trust Center
                          <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12H19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5L19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center text-white hover:text-gray-300">
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full z-50 mt-1 hidden w-[calc(100vw-2rem)] max-w-lg transform rounded-lg bg-white p-6 shadow-lg group-hover:block">
                  <div className="grid gap-4">
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">SOLUTIONS FOR</h3>
                    <a href="#" className="flex items-center rounded-lg p-3 transition hover:bg-gray-50">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0f1c2e]">Enterprise</h4>
                        <p className="text-sm text-gray-600">Solutions for large organizations</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center rounded-lg p-3 transition hover:bg-gray-50">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 12L12 8L8 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16V8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0f1c2e]">Small Business</h4>
                        <p className="text-sm text-gray-600">Tools to grow your business</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center rounded-lg p-3 transition hover:bg-gray-50">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0f1c2e]">Creators</h4>
                        <p className="text-sm text-gray-600">Tools for social media and content creators</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <Link href="#" className="text-white hover:text-gray-300">
                Pricing
              </Link>
              <div className="relative group">
                <button className="flex items-center text-white hover:text-gray-300">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute right-0 top-full z-50 mt-1 hidden w-[calc(100vw-2rem)] max-w-md transform rounded-lg bg-white p-6 shadow-lg group-hover:block">
                  <div className="grid gap-4">
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">RESOURCES</h3>
                    <a href="#" className="flex items-center rounded-lg p-3 transition hover:bg-gray-50">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 6.25278V19.2528M12 6.25278L6.5 10.0028M12 6.25278L17.5 10.0028M5 8.75278L12 4.25278L19 8.75278V15.7528L12 20.2528L5 15.7528V8.75278Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0f1c2e]">Resource Library</h4>
                        <p className="text-sm text-gray-600">Guides, tutorials, and best practices</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center rounded-lg p-3 transition hover:bg-gray-50">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0f1c2e]">Blog</h4>
                        <p className="text-sm text-gray-600">Latest news and updates</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center rounded-lg p-3 transition hover:bg-gray-50">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M18 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 8H5C3.89543 8 3 8.89543 3 10V16C3 17.1046 3.89543 18 5 18H6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="6"
                            y="2"
                            width="12"
                            height="20"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0f1c2e]">Help Center</h4>
                        <p className="text-sm text-gray-600">Support and documentation</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-white">
              <Globe className="mr-1 h-5 w-5" />
              <span className="mr-1">EN</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Link href="#" className="hidden md:block text-white hover:text-gray-300">
              Log in
            </Link>
            <Link
              href="#"
              className="hidden md:block rounded border border-white px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Get a Quote
            </Link>
            <Link href="#" className="rounded bg-white px-4 py-2 text-sm font-medium text-[#0f1c2e] hover:bg-gray-100">
              Sign up Free
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow bg-[#0f1c2e] px-4 pb-16 pt-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 h-24 w-24 opacity-20">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt=""
            width={100}
            height={100}
            className="h-full w-full"
          />
        </div>
        <div className="absolute right-0 bottom-1/4 h-32 w-32 opacity-20">
          <Image
            src="/placeholder.svg?height=130&width=130"
            alt=""
            width={130}
            height={130}
            className="h-full w-full"
          />
        </div>
        <div className="absolute left-1/4 bottom-0 h-16 w-16 opacity-20">
          <Image src="/placeholder.svg?height=60&width=60" alt="" width={60} height={60} className="h-full w-full" />
        </div>

        <div className="container mx-auto max-w-5xl">
          {/* Heading */}
          <h1 className="mb-6 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Build stronger digital connections
          </h1>
          <p className="mx-auto mb-12 max-w-4xl text-center text-lg text-white md:text-xl">
            Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right
            information. Build, edit, and track everything inside the Bitly Connections Platform.
          </p>

          {/* Tabs and Form */}
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 flex justify-center space-x-2">
              <button className="flex items-center rounded-lg bg-white px-6 py-3 font-medium text-[#0f1c2e]">
                <LinkIcon className="mr-2 h-5 w-5" />
                Short link
              </button>
              <button className="flex items-center rounded-lg bg-transparent px-6 py-3 font-medium text-white hover:bg-white/10">
                <div className="mr-2 h-5 w-5">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <rect x="9" y="9" width="6" height="6" fill="currentColor" />
                  </svg>
                </div>
                QR Code
              </button>
            </div>

            <div className="overflow-hidden rounded-lg bg-white p-8">
              <h2 className="mb-2 text-2xl font-bold text-[#0f1c2e]">Shorten a long link</h2>
              <p className="mb-6 text-gray-700">No credit card required.</p>

              <form>
                <div className="mb-6">
                  <label htmlFor="long-url" className="mb-2 block font-medium text-gray-700">
                    Paste your long link here
                  </label>
                  <input
                    type="url"
                    id="long-url"
                    placeholder="https://example.com/my-long-url"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center rounded-lg bg-[#2a5bd7] px-6 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Get your link for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}