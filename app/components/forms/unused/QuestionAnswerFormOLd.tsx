"use client"
import React, { useState, ChangeEvent, Fragment } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import Select from "react-select"
import {
	Button,
	Label,
	TextInput,
	// Textarea,
	//   Checkbox,
	//   FileInput,
	//   Radio,
	//   RangeSlider,
	//   Dropdown,
	//   Textarea,
	//   ToggleSwitch,
} from "flowbite-react"
import * as z from "zod"
import {
	useForm,
	SubmitHandler,
	Controller,
	// FieldErrors,
} from "react-hook-form"
import { getYear, getMonth, getDate } from "date-fns"
// import { createDocument } from "@/app/firebase/storeFunctions"

// const QuestionAnswerSchema = z.array(
// 	z.object({
// 		language: z.enum(["EN", "SP", "HB"]),
// 		question: z.object({
// 			askedBy: z.string().optional(),
// 			question: z.string(),
// 			// english: z.string().optional(), // formatted before being sent to DB
// 			// spanish: z.string().optional(), // formatted before being sent to DB
// 			// hebrew: z.string().optional(), // formatted before being sent to DB
// 			// upvoted: z.number(), // created server side
// 		}),
// 		answer: z.object({
// 			answeredBy: z.string().optional(),
// 			url: z.string().url(),
// 			furtherReading: z.string(),
// 			endorsed: z.boolean(),
// 			// endorsedCount: z.number(), // // created server side
// 		}),
// 	})
// )
const date = new Date()
const currentYear = getYear(date)
const currentMonth = getMonth(date)
const currentDay = getDate(date)

const QuestionAnswerSchema = z.object({
	// likes: z.number(),  // created server side
	// rating: z.number().min(1).max(5),  // created server side
	// favoritedBy: z.array(z.string()), // created server side
	// questions: QuestionAnswerSchema,
	description: z.string().min(10).max(1200),
	speaker: z.string().optional(),
	channel: z.string().optional(),
	showDate: z
		.object({
			MM: z.number().int().min(1).max(12),
			DD: z.number().int().min(1).max(31),
			YY: z.number().int().min(1).max(currentYear),
		})
		.optional(),
	questions: z.array(
		z.object({
			question: z.string().min(1),
			askedBy: z.string().min(1).optional(),
			language: z.enum(["EN", "ES", "HE"]).optional(),
		})
	),
	answers: z.array(
		z.object({
			answeredBy: z.string().min(1).optional(),
			url: z.string().url(),
			furtherReading: z.array(z.string().optional()).optional(),
			endorsed: z.boolean().optional(),
		})
	),
	categories: z.array(z.string()),
	videoURL: z.string().url(),
})

type FormValues = z.infer<typeof QuestionAnswerSchema>

const QuestionAnswerForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState<FormValues>({
		// videoData: {
		// 	// likes: 0,
		// 	// rating: 0,
		//	// favoritedBy: [],
		description: "",
		questions: [
			{
				language: "EN",
				question: "",
				askedBy: "",
			},
		],
		answers: [
			{
				answeredBy: "",
				url: "",
				furtherReading: [""],
				endorsed: false,
			},
		],
		categories: ["Noahidism"],
		showDate: {
			MM: currentMonth,
			DD: currentDay,
			YY: currentYear,
		},
		channel: "",
		speaker: "",
		videoURL: "",
		// },
	})
	const {
		register,
		handleSubmit,
		reset,
		control,
		// watch,
		formState: { errors },
	} = useForm<FormValues>({
		// resolver: zodResolver(QuestionAnswerSchema),
	})

	const processForm: SubmitHandler<FormValues> = async (data) => {
		setIsLoading(true) // Set loading state to true while submitting

		// Simulate an asynchronous process, like sending data to the server
		await new Promise((resolve) => setTimeout(resolve, 2000)) // Replace this with your actual data submission logic

		// add data to firebase
		// const formSubmitResult = await createDocument({
		// 	data: data,
		// 	collectionName: "questions",
		// })

		// if (formSubmitResult && formSubmitResult.status === "OK") {
		// 	console.log("the document was successfully added")
		// } else {
		// 	console.log("there was an error uploading the file")
		// }

		console.log("Form Data", data)
		setIsLoading(false)
		reset()
	}

	const categories: any = [
		{ value: "christianity", label: "Christianity" },
		{ value: "noahidism", label: "Noahidism" },
		{ value: "judaism", label: "Judaism" },
		{ value: "evangelism", label: "Evangelism" },
		{ value: "end-times", label: "End-times" },
	]

	const speaker: any = [
		{ value: "Tovia Singer", label: "Tovia Singer" },
		{ value: "Michael Scoback", label: "Michael Scoback" },
		{ value: "Rabbi Stuart Federow", label: "Rabbi Stuart Federow" },
		{ value: "Greg McBride", label: "Greg McBride" },
		{ value: "Other", label: "Other" },
	]

	const questionInputs = formData.questions.map((question, index) => ({
		language: register(`questions.${index}.language`),
		question: register(`questions.${index}.question`),
	}))
	const answerInputs = formData.answers.map((answer, index) => ({
		answeredBy: register(`answers[${index}].answeredBy`),
		url: register(`answers[${index}].url`),
		furtherReading: register(`answers[${index}].furtherReading`),
	}))

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<div className="w-full p-4 mt-4 bg-white/40 rounded-xl min-h-16">
				<h1 className="text-3xl text-yellow-500">QuestionForm</h1>
				<div className="grid grid-cols-12 mt-10 gap-x-6 gap-y-8">
					{/* start individual inputs */}

					{/* Render dynamic inputs for questions */}
					{formData.questions.map((item, index) => (
						<React.Fragment key={index}>
							{"question" in item && (
								<div className="relative col-span-5">
									<div className="flex justify-between px-1">
										<Label
											htmlFor="question"
											value="Question"
											className="block text-sm font-semibold leading-6 text-gray-900"
										/>
										<span
											className="text-sm leading-6 text-gray-500"
											id="question-required">
											Required
										</span>
									</div>
									<div className="relative mt-2">
										<div className="absolute inset-y-0 left-0 flex items-center">
											<label
												htmlFor="questionLanguage"
												className="sr-only">
												Language
											</label>
											<select
												id="questionLanguage"
												// name="language"
												className="h-full py-0 pl-4 z-10 -translate-y-[4px] text-gray-500 bg-transparent border-0 rounded-lg rounded-r-none border-transparent bg-none pr-9 focus:ring-2  focus:ring-inset focus:ring-[#07B6D4] sm:text-sm"
												value={item.language}
												autoComplete="language"
												{...questionInputs[index]
													.language}
												onChange={(e) => {
													const newFormData = {
														...formData,
													}
													newFormData.questions[
														index
													].language = e.target
														.value as
														| "EN"
														| "ES"
														| "HE"
													setFormData(newFormData)
												}}>
												<option>EN</option>
												<option>ES</option>
												<option>HB</option>
											</select>
										</div>
										<input
											type="text"
											id="question"
											className="block -translate-y-[4px] w-full py-[9px] bg-[#F9FAFB] rounded-lg border-0  px-3.5  pl-24 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:placeholder:opacity-0 focus:ring-2 focus:ring-inset focus:ring-[#07B6D4] sm:text-sm sm:leading-6"
											placeholder="Your Question"
											{...questionInputs[index].question}
											value={item.question}
											onChange={(e) => {
												const newFormData = {
													...formData,
												}
												newFormData.questions[
													index
												].question = e.target.value
												setFormData(newFormData)
											}}
										/>
										{errors.questions?.length && (
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<ExclamationCircleIcon
													className="w-5 h-5 text-red-500"
													aria-hidden="true"
												/>
											</div>
										)}
									</div>
									{errors?.questions?.length && (
										<p
											className="pl-2 mt-2 text-sm text-red-600"
											id={`question-error-${index}`}>
											{errors.questions[index].message}
										</p>
									)}
								</div>
							)}
						</React.Fragment>
					))}
					{formData.answers.map((item, index) => (
						<React.Fragment key={index}>
							{"url" in item && (
								<div className="col-span-full md:col-span-5">
									<div className="flex justify-between px-1">
										<Label
											htmlFor="answer"
											value="Answer URL"
											className="block text-sm font-semibold leading-6 text-gray-900"
										/>
										<span
											className="text-sm leading-6 text-gray-500"
											id="answer-required">
											Required
										</span>
									</div>
									<div className="mt-1">
										<div className="relative">
											<TextInput
												id="answer"
												type="text"
												placeholder="Include Timestamp"
												{...answerInputs[index].url}
												value={item.url}
												onChange={(e) => {
													const newFormData = {
														...formData,
														answers:
															formData.answers.map(
																(answer, i) =>
																	i === index
																		? {
																				...answer,
																				url: e
																					.target
																					.value,
																		  }
																		: answer
															),
													}
													setFormData(newFormData)
												}}
												className="focus:placeholder:opacity-0"
											/>
											{errors.answers?.length && (
												<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
													<ExclamationCircleIcon
														className="w-5 h-5 text-red-500"
														aria-hidden="true"
													/>
												</div>
											)}
										</div>
										{errors.answers &&
											errors.answers.length && (
												<p className="pl-2 mt-2 text-sm text-red-400">
													{
														errors.questions[index]
															.message
													}
												</p>
											)}
									</div>
								</div>
							)}
						</React.Fragment>
					))}
					{/* Delete Button */}
					<button
						className="col-span-2"
						onClick={() => {
							setFormData((prevState) => ({
								...prevState,
								questions: prevState.questions.filter(
									(_, i) => i !== index
								),
								answers: prevState.answers.filter(
									(_, i) => i !== index
								),
							}))
						}}>
						Delete
					</button>
					<div className="flex items-end justify-end px-10 col-span-full">
						<Button
							className="col-span-2 "
							onClick={() =>
								setFormData((prevState) => ({
									...prevState,
									questions: [
										...prevState.questions,
										{
											language: "EN",
											question: "",
											askedBy: "",
										},
									],
									answers: [
										...prevState.answers,
										{
											answeredBy: "",
											url: "",
											furtherReading: [""],
											endorsed: false,
										},
									],
								}))
							}>
							Add Another Question
						</Button>
					</div>

					{/* Video URL*/}
					<div className="col-span-full md:col-span-6 ">
						<div className="flex justify-between px-1">
							<Label
								htmlFor="videourl"
								value="Video URL"
								className="block text-sm font-semibold leading-6 text-gray-900"
							/>
						</div>
						<div className="mt-1">
							<div className="relative">
								<TextInput
									id="videoURL"
									type="text"
									placeholder="URL"
									{...register("videoURL")}
									value={formData.videoURL}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFormData({
											...formData,
											videoURL: e.target.value,
										})
									}
									className="focus:placeholder:opacity-0 "
								/>
								{errors.videoURL && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<ExclamationCircleIcon
											className="w-5 h-5 text-red-500"
											aria-hidden="true"
										/>
									</div>
								)}
							</div>
							{errors.videoURL?.message && (
								<p className="pl-2 mt-2 text-sm text-red-400">
									{errors.videoURL.message}
								</p>
							)}
						</div>
					</div>
					{/* Categories */}
					<div className="sm:col-span-6">
						<Label
							htmlFor="categories"
							value="Categories"
							className="block px-1 text-sm font-semibold leading-6 text-gray-900"
						/>
						<div className="mt-1">
							<Controller
								name="categories"
								control={control}
								render={({ field }: any) => (
									<Select
										{...field}
										isMulti
										className="h-full mb-4 rounded-lg bg-[#F9FAFB]"
										options={categories}
										placeholder="Categories"
										// getOptionValue={(option) => option.value}
										// getOptionLabel={(option) => option.label}
										isSearchable
										onChange={(selectedOption) => {
											// setFormData({
											// 	...formData,
											// 	categories: selectedOption?.value || ''
											// })
											return field.onChange(
												selectedOption || ""
											)
										}}
										styles={{
											control: (
												baseStyles: any,
												state: any
											) => ({
												...baseStyles,
												borderColor: state.isFocused
													? "#07B6D4"
													: "#D1D5DB",
												boxShadow: state.isFocused
													? "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) #07B6D4"
													: "",
												backgroundColor: "#F9FAFB",
												borderRadius: "0.375rem",
												paddingBlock: "2.3px",
											}),
										}}
									/>
								)}
							/>
						</div>
					</div>
					{/* Video Date */}
					<div className="col-span-full md:col-span-6">
						<div className="grid grid-cols-6 gap-4">
							<div className="col-span-2">
								<Label
									htmlFor="showDate-MM"
									value="MM"
									className="block px-1 text-sm font-semibold leading-6 text-gray-900"
								/>
								<TextInput
									id="showDate-MM"
									type="text"
									placeholder="MM"
									{...register("showDate.MM")}
									value={formData.showDate.MM}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFormData({
											...formData,
											showDate: {
												...formData.showDate,
												MM: parseInt(e.target.value),
											},
										})
									}
									className="focus:placeholder:opacity-0"
								/>
							</div>
							<div className="col-span-2">
								<Label
									htmlFor="showDate-DD"
									value="DD"
									className="block px-1 text-sm font-semibold leading-6 text-gray-900"
								/>
								<TextInput
									id="showDate-DD"
									type="text"
									placeholder="DD"
									{...register("showDate.DD")}
									value={formData.showDate.DD}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFormData({
											...formData,
											showDate: {
												...formData.showDate,
												DD: parseInt(e.target.value),
											},
										})
									}
									className="focus:placeholder:opacity-0"
								/>
							</div>
							<div className="col-span-2">
								<Label
									htmlFor="showDate-YY"
									value="YY"
									className="block px-1 text-sm font-semibold leading-6 text-gray-900"
								/>
								<TextInput
									id="showDate-YY"
									type="text"
									placeholder="YY (optional)"
									{...register("showDate.YY")}
									value={formData.showDate.YY || ""}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFormData({
											...formData,
											showDate: {
												...formData.showDate,
												YY: parseInt(e.target.value),
											},
										})
									}
									className="focus:placeholder:opacity-0"
								/>
							</div>
						</div>
						{/* Display errors */}
						{/* Add error handling similar to other fields if needed */}
					</div>
					{/* Categories */}
					<div className="sm:col-span-6">
						<Label
							htmlFor="speaker"
							value="Speaker"
							className="block px-1 text-sm font-semibold leading-6 text-gray-900"
						/>
						<div className="mt-1">
							<Controller
								name="speaker"
								control={control}
								render={({ field }: any) => (
									<Select
										{...field}
										className="h-full mb-4 rounded-lg bg-[#F9FAFB]"
										options={speaker}
										placeholder="speaker"
										// getOptionValue={(option) => option.value}
										// getOptionLabel={(option) => option.label}
										isSearchable
										onChange={(selectedOption) => {
											// setFormData({
											// 	...formData,
											// 	categories: selectedOption?.value || ''
											// })
											return field.onChange(
												selectedOption || ""
											)
										}}
										styles={{
											control: (
												baseStyles: any,
												state: any
											) => ({
												...baseStyles,
												borderColor: state.isFocused
													? "#07B6D4"
													: "#D1D5DB",
												boxShadow: state.isFocused
													? "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) #07B6D4"
													: "",
												backgroundColor: "#F9FAFB",
												borderRadius: "0.375rem",
												paddingBlock: "2.3px",
											}),
										}}
									/>
								)}
							/>
						</div>
					</div>
					{/* url */}
					{/* Description */}
					{/* <div className="col-span-full md:col-span-6 ">
						<div className="flex justify-between px-1">
							<Label
								htmlFor="description"
								value="Description"
								className="block text-sm font-semibold leading-6 text-gray-900"
							/>
							<span
								className="text-sm leading-6 text-gray-500"
								id="description-required">
								Required
							</span>
						</div>
						<div className="mt-1">
							<div className="relative">
								<Textarea
									id="description"
									rows={4}
									placeholder="Video Description"
									{...register("description")}
									value={formData.description}
									onChange={(
										e: ChangeEvent<HTMLTextAreaElement>
									) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
									className="focus:placeholder:opacity-0"
								/>
								{errors.description && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<ExclamationCircleIcon
											className="w-5 h-5 text-red-500"
											aria-hidden="true"
										/>
									</div>
								)}
							</div>
							{errors.description?.message && (
								<p className="pl-2 mt-2 text-sm text-red-400">
									{errors.description.message}
								</p>
							)}
						</div>
					</div> */}
				</div>
				<Button
					type="submit"
					disabled={isLoading}
					className={` ${
						isLoading ? "bg-zinc-100" : "bg-teal-400"
					} flex mx-auto my-6 text-2xl`}>
					Submit
				</Button>
			</div>
		</form>
	)
}

export default QuestionAnswerForm
