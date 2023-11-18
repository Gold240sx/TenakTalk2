import React from "react"
import Image from "next/image"
// import Link from "next/link"

export default function Home() {
	return (
		<section className="">
			<Image
				className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
				src="/next.svg"
				alt="Next.js Logo"
				width={180}
				height={37}
				priority
			/>
		</section>
	)
}
