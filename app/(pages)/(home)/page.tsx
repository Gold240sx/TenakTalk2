import React from "react"
import Image from "next/image"
// import Link from "next/link"
import { BibleRef } from "@/app/context/library"

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
			Malachi Christian verse count Chapter: 4 Malachi Jewish verse count:
			<br />
			<br />
			Chapter 3:
			{/* {BiblicalRef.find((book) => book.name === "Malachi")?.chapters[3]} */}
			{BibleRef.find((book) => book.name === "Genesis")?.chapters[8]}
		</section>
	)
}
