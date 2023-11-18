import React from "react"
import Link from "next/link"

type NavLink = {
	label: string
	link: string
	permissions: "user" | "admin"
}

const Links: NavLink[] = [
	{ label: "Questions", link: "questions", permissions: "user" },
	{ label: "Subjects", link: "Subjects", permissions: "user" },
	{ label: "Rabiim", link: "Rabiim", permissions: "user" },
	{ label: "Materials", link: "Materials", permissions: "user" },
	{ label: "Resources", link: "Resources", permissions: "user" },
	{ label: "Add Question", link: "addQuestion", permissions: "admin" },
]

const Navbar = () => {
	return (
		<nav className="z-10 flex max-w-5xl ml-auto font-mono text-sm w-fit">
			<ul className="flex flex-row gap-3 font-semibold uppercase text-emerald-900">
				{Links.map((link, index) => (
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
