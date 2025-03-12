import Link from "next/link";

export default function TopBar() {

    return (
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
    )
}