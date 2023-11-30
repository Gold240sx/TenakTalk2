/* eslint-disable */
// @ts-nocheck
import { BibleRef } from "./BibleRef"

type NavLink = {
	label: string
	link: string
	permissions: "user" | "admin"
}
type ChannelProps =
	| {
			value: string
			label: string
			speakers: string[]
			link: string
			social?: {
				public?: {
					facebook?: string
					phone?: string
					email?: string
					whatsApp?: ""
				}
				private?: {
					whatsApp?: string
				}
				schedule?: {
					sunday: [
						{
							time?: "9:30 a.m."
							zone?: "CST"
							title?: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer"
							speaker?: "Rabbi Tovia Singer"
						},
					]
					monday: [
						{
							time?: "9:30 a.m."
							zone?: "CST"
							title?: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer"
							speaker?: "Rabbi Tovia Singer"
						},
					]
					tuesday: [
						{
							time?: "9:30 a.m."
							zone?: "CST"
							title?: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer"
							speaker?: "Rabbi Tovia Singer"
						},
					]
					wednesday: [
						{
							time?: "9:30 a.m."
							zone?: "CST"
							title?: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer"
							speaker?: "Rabbi Tovia Singer"
						},
					]
					thursday: [
						{
							time?: "9:30 a.m."
							zone?: "CST"
							title?: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer"
							speaker?: "Rabbi Tovia Singer"
						},
					]
					friday: [
						{
							time?: "9:30 a.m."
							zone?: "CST"
							title?: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer"
							speaker?: "Rabbi Tovia Singer"
						},
					]
					shabbos: [
						{
							time?: "9:30 a.m."
							zone?: "CST"
							title?: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer"
							speaker?: "Rabbi Tovia Singer"
						},
					]
				}
			}
			schedule?: [
				{
					sunday: [
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
					]
					monday: [
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
					]
					tuesday: [
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
					]
					wednesday: [
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
					]
					thursday: [
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
					]
					friday: [
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
					]
					sabbath: [
						{
							time: string
							zone: string
							title: string
							speaker: string
						},
					]
				},
			]
	  }
	| { value: "Other"; label: "Other" }
type DropDownObject = {
	value: string
	label: string
}
type ResourceProps = {
	type: string
	name: string
	link?: string
	focuses?: [
		{
			id: number
			focus?: string
			focusLabel?: string
			description?: string
			type?: string
		},
	]
}
type SiteParamProps = {
	channels: { selectOptions: ChannelProps[] }
	categoryOptions: DropDownObject[]
	resources: {
		channels: ResourceProps[]
		education: {
			books: ResourceProps[]
		}
	}
	navigation: NavLink[]
}

const SiteParams: SiteParamProps = {
	channels: {
		selectOptions: [
			{
				value: "Tenak Talk",
				label: "Tenak Talk",
				speakers: [
					"Tovia Singer",
					"Greg Mcbride",
					"Michael Skobac",
					"Rabbi Stuart Federow",
					"Other",
				],
				link: "https://www.youtube.com/@tenaktalk",
				social: {
					public: {
						facebook: "https://www.facebook.com/TeNaKTalk/",
						phone: "(855) 952-4253",
						email: "william@tanachtalk.com",
					},
					private: {
						whatsApp: "",
					},
				},
				schedule: {
					sunday: [
						{
							time: "9:30 a.m.",
							zone: "CST",
							title: "Let's Get Biblical Q&A (LIVE) Rabbi Tovia Singer",
							speaker: "Rabbi Tovia Singer",
						},
						{
							time: "7:00 p.m.",
							zone: "CST",
							title: "***most Sundays*** 2-Guys Premiere (REPLAY)",
							speaker: "Greg Mcbride",
						},
					],
					monday: [
						{
							time: "9:00 a.m.",
							zone: "CST",
							title: "A Rabbi Cross-Examines the New Testament (LIVE) Rabbi Michael Skobac",
							speaker: "Rabbi Michael Scobac",
						},
						{
							time: "7:00 p.m.",
							zone: "CST",
							title: "TNT (LIVE) with Rabbi Stuart Federow",
							speaker: "Rabbi Stuart Federow",
						},
					],
					tuesday: [
						{
							time: "7:00 p.m.",
							zone: "CST",
							title: "***Most Tuesdays*** Premiere (REPLAY)",
							speaker: "",
						},
					],
					wednesday: [
						{
							time: "5:30 p.m.",
							zone: "CST",
							title: "Torah Talk Weekly Parsha (LIVE)",
							speaker: "Rabbi Michael Scobac",
						},
						{
							time: "7:00 p.m.",
							zone: "CST",
							title: "2 Guys with Greg McBride (LIVE)",
							speaker: "Greg Mcbride",
						},
					],
					thursday: [
						{
							time: "7:00 p.m.",
							zone: "CST",
							title: " ***Most Thursdays*** Premiere (REPLAY)",
							speaker: "",
						},
					],
					friday: {},
					sabbath: {},
				},
			},
			{
				value: "Tovia Singer",
				label: "Tovia Singer",
				speakers: ["Tovia Singer"],
				link: "https://www.youtube.com/@ToviaSinger1",
			},
			{
				value: "NETIV",
				label: "NETIV",
				speakers: ["Rod Bryan", "Tovia Singer", "Rabbi Yaakov Wolbe"],
				link: "https://www.youtube.com/@NetivOnline",
			},
			{
				value: "Jews For Judaism",
				label: "Jews For Judaism",
				speakers: ["Michael Skobac", "Tovia Singer"],
				link: "https://www.youtube.com/@JewsforJudaismCanada",
			},
			{
				value: "Rabbi YY Jacobson",
				label: "Rabbi YY Jacobson",
				speakers: ["Rabbi YY Jacobson"],
				link: "https://www.youtube.com/@RabbiYYJacobson",
			},
			{
				value: "Chevra Rav Moshe Chaim",
				label: "Chevra Rav Moshe Chaim",
				speakers: ["Chevra Rav Moshe Chaim"],
				link: "https://www.youtube.com/@ChevraRavMosheChaim",
			},
			{
				value: "Simon Jacobson - Meaningful Life Center",
				label: "Simon Jacobson - Meaningful Life Center",
				speakers: ["Simon Jacobson"],
				link: "https://www.youtube.com/@Meaningfullifecenter",
			},
			{ value: "Other", label: "Other" },
		],
	},
	categoryOptions: [
		{ value: "christian", label: "Christianity" },
		{ value: "noahidism", label: "Noahidism" },
		{ value: "judaism", label: "Judaism" },
		{ value: "prophecy", label: "Prophecy" },
		{ value: "hashem", label: "Hashem" },
		{ value: "messiah", label: "Messiah" },
		{ value: "evangelism", label: "Evangelism" },
		{ value: "Jewish Law", label: "Jewish Law" },
		{ value: "conversion", label: "Conversion" },
		{ value: "end-times", label: "End-times" },
		{ value: "church history", label: "Church History" },
		{ value: "jewish history", label: "Jewish History" },
	],
	//  resource types: "channel" | "book - learning" | " kids" | "religious text" | "video series" | "video"
	resources: {
		channels: [
			{
				type: "channel",
				name: "Aleph Beta",
				link: "https://www.youtube.com/@AlephBeta",
				focuses: [
					{
						id: 1,
						focus: "https://youtube.com/playlist?list=PLmG0lNuEBb3BHcFiSS8mqo6n80hhMBZcn&si=69DQPnvGNwv9J6o0",
						focusLabel: "Weekly Parsha Experiment",
						description: "",
						type: "video series",
					},
				],
			},
			{
				type: "channel",
				name: "Meaningful People",
				link: "https://www.youtube.com/@MeaningfulPeople",
			},
		],
		education: {
			books: [
				{
					type: "religious text",
					name: "Let's Get Biblical",
					link: "https://outreachjudaism.org/shop/lets-get-biblical-expanded-2-volume-study-guide/",
				},
			],
		},
	},
	navigation: [
		{ label: "Questions", link: "questions", permissions: "user" },
		// { label: "Subjects", link: "Subjects", permissions: "user" },
		// { label: "Rabiim", link: "Rabiim", permissions: "user" },
		// { label: "Materials", link: "Materials", permissions: "user" },
		{ label: "Resources", link: "Resources", permissions: "user" },
		{ label: "Add Question", link: "addQuestion", permissions: "admin" },
	],
}

export { SiteParams, BibleRef }
