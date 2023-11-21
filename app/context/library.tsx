const SiteParams = {
	channels: {
		selectOptions: [
			{
				value: "Tenak Talk",
				label: "Tenak Talk",
				speakers: [
					"Tovia Singer",
					"Greg Mcbride",
					"Michael Scoback",
					"Rabbi Stuart Federow",
					"Other",
				],
				link: "https://www.youtube.com/@tenaktalk",
				social: {
					public: {
						facebook: "",
					},
					private: {
						whatsApp: "",
					},
				},
				schedule: {
					sunday: {
						time: "",
						zone: "",
					},
					monday: {
						time: "",
						zone: "",
					},
					tuesday: {
						time: "",
						zone: "",
					},
					wednesday: {
						time: "",
						zone: "",
					},
					thursday: {
						time: "",
						zone: "",
					},
					friday: {
						time: "",
						zone: "",
					},
					sabbath: {
						time: "",
						zone: "",
					},
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
				speakers: ["Michael Scoback", "Tovia Singer"],
				link: "https://www.youtube.com/@JewsforJudaismCanada",
			},
			{
				value: "Rabbi YY Jacobson",
				label: "Rabbi YY Jacobson",
				speakers: ["Rabbi YY Jacobson"],
				link: "https://www.youtube.com/@RabbiYYJacobson",
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
		{ value: "christianity", label: "Christianity" },
		{ value: "noahidism", label: "Noahidism" },
		{ value: "judaism", label: "Judaism" },
		{ value: "evangelism", label: "Evangelism" },
		{ value: "end-times", label: "End-times" },
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
}

export { SiteParams }
