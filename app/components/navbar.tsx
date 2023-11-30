import React from "react"
import Link from "next/link"
import { SiteParams } from "@library"

const Navbar = () => {
	return (
		<nav className="z-10 flex max-w-5xl ml-auto font-mono text-sm w-fit">
			<ul className="flex flex-row gap-3 font-semibold uppercase text-emerald-900">
				{SiteParams.navigation.map((link, index) => (
					<div key={index}>
						{link.permissions === "user" && (
							<li className="px-4 py-2 border border-transparent cursor-pointer hover:border-black/20 hover:text-black">
								<Link href={link.link}>{link.label}</Link>
							</li>
						)}
						{link.permissions === "admin" && (
							<li className="px-4 py-2 text-black border border-transparent cursor-pointer hover:border-black/20 hover:text-black">
								<Link href={link.link}>{link.label}</Link>
							</li>
						)}
					</div>
				))}
			</ul>
		</nav>
	)
}

export default Navbar
