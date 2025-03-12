import { Barcode, Book, Link, QrCode } from "lucide-react"
import { JSX } from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


interface NavLink {
    title: string
    left: {
        sections: {
            title: string
            links: {
                link: string
                title: string
                description?: string,
                icon?: JSX.Element
            }[]
        }[]
    }

    right?: JSX.Element
}

export default function NavBar() {

    const navLinks: NavLink[] = [
        {
            title: 'Platform',
            left: {
                sections: [
                    {
                        title: 'Products',
                        links: [
                            {
                                link: '#',
                                title: 'Url Shortener',
                                description: 'Customize, share and track links',
                                icon: <Link />
                            },
                            {
                                link: '#',
                                title: '2D Barcodes',
                                description: 'Add a Global Trade Number (GTIN) to QR Codes designed for packaging',
                                icon: <Barcode />
                            },
                            {
                                link: '#',
                                title: 'Pages',
                                description: 'Mobile-friendly, no-code landing pages',
                                icon: <Book />
                            },
                            {
                                link: '#',
                                title: 'QR Code Generator',
                                description: 'Dynamic solutions to fit every business need',
                                icon: <QrCode />
                            },
                            {
                                link: '#',
                                title: 'Analytics',
                                description: 'A central place to track and analyze performance',
                                icon: <QrCode />
                            }
                        ]
                    },
                    {
                        title: 'Features',
                        links: [
                            {
                                link: '#',
                                title: 'Url Shortener',
                                description: 'Customize, share and track links',
                                icon: <Link />
                            },
                            {
                                link: '#',
                                title: '2D Barcodes',
                                description: 'Add a Global Trade Number (GTIN) to QR Codes designed for packaging',
                                icon: <Barcode />
                            },
                            {
                                link: '#',
                                title: 'Pages',
                                description: 'Mobile-friendly, no-code landing pages',
                                icon: <Book />
                            },
                            {
                                link: '#',
                                title: 'QR Code Generator',
                                description: 'Dynamic solutions to fit every business need',
                                icon: <QrCode />
                            },
                            {
                                link: '#',
                                title: 'Analytics',
                                description: 'A central place to track and analyze performance',
                                icon: <QrCode />
                            }
                        ]
                    }
                ]
            }
        }
    ]

    return (
        <nav className="flex py-4 px-16">
            <div className="">
                <h2 className="font-bold text-2xl">QT URLZ</h2>
            </div>
            <div className="">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className=""></div>
        </nav>
    )
}