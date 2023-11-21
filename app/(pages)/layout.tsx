import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@components/navbar"
import "../styles/globals.css"

export const metadata: Metadata = {
	title: "Tenak Talk",
	description:
		"A website for Noahides, Ex-Christians, and prospective Jewish Converts",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={"w-screen relative m-0 p-0"}>
				<header className="fixed top-0 left-0 flex items-center justify-between w-full p-8 duration-500 align-center ">
					<Link
						href="/"
						className="flex mr-auto text-2xl font-bold text-white uppercase logo whitespace-nowrap w-fit">
						Tenak Talk
					</Link>
					<Navbar />
				</header>
				<main className=" flex min-h-[100vh] flex-col items-center justify-between p-8 md:p-24">
					<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]"></div>
					<div className="flex items-center justify-center w-full max-w-5xl font-mono text-sm lg:flex">
						{children}
					</div>
					<div className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
						Footer
					</div>
				</main>
			</body>
		</html>
	)
}
