"use client"
/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Button, Label, TextInput, Textarea } from "flowbite-react"
import { getMonth, getDate, format, getYear } from "date-fns"
import { useMediaQuery } from "react-responsive"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import * as z from "zod"
import {
	useForm,
	useFieldArray,
	FieldErrors,
	useFormContext,
	useWatch,
	Controller,
	SubmitHandler,
} from "react-hook-form"
import { SiteParams } from "@/app/context/library"
import { createDocument } from "@/app/firebase/storeFunctions"
import { getAllSpeakers, showAlert } from "@/app/functions/formSupport"
import { ifError } from "assert"

const date = new Date()
// const currentYear = format(date, "yy")
const currentYear = getYear(date)
const currentMonth = getMonth(date)
const currentDay = getDate(date)

// Types
const EmptyArray = z.array(z.never())
const DropDownObject = z.object({
	value: z.string(),
	label: z.string(),
})
const DropdownArray = z.array(DropDownObject)
const QAFormSchema = z.object({
	showDate: z
		.object({
			MM: z.number().int().min(1).max(12),
			DD: z.number().int().min(1).max(31),
			YY: z.number().min(1).max(currentYear),
		})
		.optional(),
	Points: z
		.array(
			z.object({
				point: z.string().min(10).optional(),
				pointTimeStamp: z.string().url().optional(),
				verseRef: z
					.object({
						book: z.string(),
						ref: z.string(),
					})
					.optional(),
			})
		)
		.optional(),
	QnA: z.array(
		z.object({
			language: z.string().max(2),
			question: z
				.string()
				.min(1, { message: "Please enter a valid Question" }),
			timeStamp: z
				.string()
				.min(5, { message: "Time Stamp required" })
				.url({ message: "Invalid URL" }),
			// .optional(),
			// furtherReading: z.array(z.string().optional()).optional(),
			categories: z
				.array(
					z.object({
						label: z.string().min(1),
						value: z
							.string()
							.min(1, { message: "Please enter a category" }),
					})
				)
				.min(1),
		})
	),
	description: z.string().min(10).max(1200),
	speaker: DropdownArray.or(DropDownObject).or(EmptyArray),
	channel: z
		.object({
			value: z.string(),
			label: z.string(),
		})
		.optional(),
})
type DropdownValue = z.infer<typeof DropDownObject>
type FormValues = z.infer<typeof QAFormSchema>

function QuestionAnswerForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [filteredSpeakers, setFilteredSpeakers] = useState<DropdownValue[]>(
		[]
	)
	const [speakerDisabled, setSpeakerDisabled] = useState<Boolean>(true)
	const [channelIsOther, setChannelIsOther] = useState<Boolean>(false)
	const {
		register,
		control,
		setValue,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			QnA: [
				{
					language: "EN",
					question: "",
					timeStamp: "",
					categories: [],
					// furtherReading: [""], // saved for later
					// endorsed: false, // saved for later
				},
			],
			points: [
				{
					point: "",
					pointTimeStamp: "",
				},
			],
			showDate: {
				DD: currentDay,
				MM: currentMonth,
				YY: currentYear,
			},
			description: "",
			speaker: [{ value: "", label: "" }],
			channel: { value: "", label: "" },
		},
		// mode: "onSubmit",
	})
	const { fields, append, remove } = useFieldArray({
		name: "QnA",
		// points: "Points",
		control,
	})
	const { categoryOptions, channels } = SiteParams
	const allSpeakers = getAllSpeakers(channels.selectOptions)
	const channel = useWatch({ control, name: "channel" }) // Watch for changes in the 'channel' dropdown to update the Speakers dropdown
	useEffect(() => {
		// Find the selected channel object
		const { value } = channel
		if (value === "Other") {
			setChannelIsOther(true)
		} else {
			setChannelIsOther(false)
		}
		const selectedChannel = channels.selectOptions.find(
			(option) => option.value === channel.value
		)
		setValue("speaker", [])
		// // Extract speakers based on the selected channel
		if (selectedChannel && selectedChannel.speakers) {
			setFilteredSpeakers(
				selectedChannel.speakers.map((speaker) => ({
					value: speaker,
					label: speaker,
				}))
			)
			setSpeakerDisabled(false)
		} else {
			setFilteredSpeakers([{ value: "", label: "" }]) // Reset speakers if no channel is selected
		}
	}, [channel])

	const onSubmit = async (data: any) => {
		setIsLoading(true)
		// await new Promise((resolve) => setTimeout(resolve, 2000))

		///////////////////////
		// modify the output of the data object to account for the dropdowns.
		///////////////////////
		const {
			description,
			showDate: ShowDate,
			speaker,
			channel: Channel,
			QnA: QnAs,
		} = data
		const speakers = speaker.map((s: DropdownValue) => s.value)
		const channel = Channel.value
		const showDate = ShowDate.MM + "/" + ShowDate.DD + "/" + ShowDate.YY
		const QnA = QnAs.map((qna: any) => {
			return {
				...qna,
				categories: qna.categories.map(
					(category: DropdownValue) => category.value
				),
			}
		})

		const newData = {
			description,
			showDate,
			speakers,
			channel,
			QnA,
		}

		const formSubmitResult = await createDocument({
			data: newData,
			collectionName: "questions",
		})

		if (formSubmitResult.status === "OK") {
			showAlert({ text: "Data successfully Uploaded", status: "OK" })
			console.log("Form Data", data)
		} else {
			showAlert({ text: "Error uploading question data", status: "ERR" })
		}
		setSpeakerDisabled(true)
		setIsLoading(false)
		reset()
	}

	// styles for cursor not allowed on speaker when the channel is not defined
	const styles = {
		control: (css: any, state: any) => ({
			...css,
			...(state.isDisabled && {
				pointerEvents: "auto",
				cursor: "not-allowed",
			}),
		}),
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid w-full grid-cols-12 gap-4 p-4 mt-4 bg-white/40 rounded-xl min-h-16">
				<h1 className="text-3xl text-yellow-500">QuestionForm</h1>
				<p className="col-span-full">Upload your question</p>
				{/* <div className="grid grid-cols-12 mt-10 gap-x-6 gap-y-8"> */}
				<div className="grid grid-cols-12 gap-4 col-span-full">
					{/* start individual inputs */}
					{/* show date */}
					<div className="col-span-5 col-start-8 gap-1 p-3 w-fit">
						<div className="relative col-span-6 px-1 mb-2">
							<Label
								htmlFor="showDate"
								value="Show Date"
								className="text-xl font-semibold leading-6 text-gray-900 "
							/>
						</div>
						<div className="grid grid-cols-6">
							<div className="col-span-2  max-w-[50px] w-fit">
								<Label
									htmlFor="showDate.mm"
									value="MM"
									className="px-1 text-sm font-semibold leading-6 text-gray-400 "
								/>
								<TextInput
									id="showdate.mm"
									style={{
										textAlign: "center",
										fontSize: "14px",
									}}
									{...register("showDate.MM")}
									placeholder="Month"
								/>
							</div>
							<div className="col-span-2 max-w-[50px]  w-fit">
								<Label
									htmlFor="showDate.dd"
									value="DD"
									className="px-1 text-sm font-semibold leading-6 text-gray-400 "
								/>
								<TextInput
									id="showdate.dd"
									style={{
										textAlign: "center",
										fontSize: "14px",
									}}
									{...register("showDate.DD")}
									placeholder="Day"
								/>
							</div>
							<div className="col-span-2 max-w-[75px]  w-fit">
								<Label
									htmlFor="showDate.yy"
									value="YYYY"
									className="px-1 text-sm font-semibold leading-6 text-gray-400 "
								/>
								<TextInput
									id="showdate.yy"
									style={{
										textAlign: "center",
										fontSize: "14px",
									}}
									{...register("showDate.YY")}
									placeholder="Year"
								/>
							</div>
						</div>
					</div>
					{/* Dynamic QnA's*/}
					<div className="rounded-xl col-span-full sm:bg-white sm:p-3">
						{fields.map((field, index) => {
							return (
								<div
									key={field.id}
									className="flex flex-col gap-4 ">
									<div className="grid grid-cols-12 gap-4 p-3 my-3 bg-white sm:my-0 rounded-xl sm:bg-transparent">
										{/* Question */}
										<section className="col-span-full ">
											<div className="relative flex flex-col gap-1 section">
												<div className="flex justify-between px-1">
													<Label
														htmlFor={`question-${index}`}
														value="Question"
														className="block text-sm font-semibold leading-6 text-gray-900"
													/>
													<span
														className="text-sm leading-6 text-gray-500"
														id={`question-${index}-required`}>
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
															{...register(
																`QnA.${index}.language` as const,
																{
																	required:
																		true,
																}
															)}
															className="h-full py-0  pl-4 z-10 -translate-y-[8px] text-gray-500 bg-transparent border-0 rounded-lg rounded-r-none border-transparent bg-none pr-9 focus:ring-2  focus:ring-inset focus:ring-[#07B6D4] sm:text-sm"
															autoComplete="language">
															<option>EN</option>
															<option>ES</option>
															<option>HE</option>
														</select>
													</div>
													<Textarea
														// type="text"
														id={`question-${index}`}
														// rows={2}
														className="block -translate-y-[8px] no-scrollbar w-full py-4 bg-[#F9FAFB] h-fit rounded-lg border-0 text-lg  px-3.5  pl-24 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:placeholder:opacity-0 focus:ring-2 focus:ring-inset focus:ring-[#07B6D4] sm:leading-6"
														placeholder="Your Question"
														{...register(
															`QnA.${index}.question` as const,
															{
																required: true,
															}
														)}
													/>
													{errors?.QnA?.[index]
														?.question && (
														<div className="absolute -translate-y-[8px]  inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
															<ExclamationCircleIcon
																className="w-5 h-5 text-red-500"
																aria-hidden="true"
															/>
														</div>
													)}
												</div>
												{errors?.QnA?.[index]
													?.question && (
													<p
														className="pl-2 mt-2 text-sm -translate-y-[8px] text-red-600/60"
														id="phoneNo-error">
														{/* {
															errors?.QnA?.[index]
																?.question
																?.message
														} */}
														Invalid question
													</p>
												)}
											</div>
										</section>
										{/* timeStamp */}
										<section className="col-span-full sm:col-span-5">
											<div className="relative flex flex-col gap-1 section">
												<div className="flex justify-between px-1">
													<Label
														htmlFor={`timeStamp-${index}`}
														value="Time Stamp"
														className="block text-sm font-semibold leading-6 text-gray-900"
													/>
													<span
														className="text-sm leading-6 text-gray-500"
														id={`timeStamp-${index}-required`}>
														Required
													</span>
												</div>
												<div className="relative">
													<TextInput
														id={`timeStamp-${index}`}
														placeholder="timeStamp"
														{...register(
															`QnA.${index}.timeStamp` as const,
															{
																required: true,
															}
														)}
														className={
															errors?.QnA?.[index]
																?.timeStamp
																? "error"
																: "placeholder:opacity-0"
														}
														defaultValue={
															field.timeStamp
														}
													/>
													{errors?.QnA?.[index]
														?.timeStamp && (
														<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
															<ExclamationCircleIcon
																className="w-5 h-5 text-red-500"
																aria-hidden="true"
															/>
														</div>
													)}
												</div>
												{errors?.QnA?.[index]
													?.timeStamp && (
													<p
														className="pl-2 mt-2 text-sm text-red-600/60"
														id="phoneNo-error">
														{/* {
															errors?.QnA?.[index]
																?.timeStamp
																?.message
														} */}
														Invalid Time Stamp
													</p>
												)}
											</div>
										</section>
										{/* Categories */}
										<section className="col-span-full sm:col-span-5">
											<div className="relative flex flex-col gap-1 section">
												<div className="flex justify-between px-1">
													<Label
														htmlFor={`categories-${index}`}
														value="Categories"
														className="block text-sm font-semibold leading-6 text-gray-900"
													/>
													<span
														className="text-sm leading-6 text-gray-500"
														id={`categories-${index}-required`}>
														Required
													</span>
												</div>
												<div className="relative">
													<Controller
														name={`QnA.${index}.categories`}
														control={control}
														render={({
															field,
														}: any) => (
															<Select
																{...field.categories}
																isMulti
																className="h-full mb-4 rounded-lg bg-[#F9FAFB]"
																options={
																	categoryOptions
																}
																onChange={(
																	selectedOptions: any
																) => {
																	const formattedOptions =
																		selectedOptions.map(
																			(
																				option: any
																			) => ({
																				value: option.value,
																				label: option.label,
																			})
																		)
																	field.onChange(
																		formattedOptions
																	)
																}}
																placeholder="Categories"
																isSearchable
																// onChange={(
																// 	selectedOption
																// ) => {
																// 	return field.onChange(
																// 		selectedOption ||
																// 			""
																// 	)
																// }}
																styles={{
																	control: (
																		baseStyles: any,
																		state: any
																	) => ({
																		...baseStyles,
																		borderColor:
																			state.isFocused
																				? "#07B6D4"
																				: "#D1D5DB",
																		boxShadow:
																			state.isFocused
																				? "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) #07B6D4"
																				: "",
																		backgroundColor:
																			"#F9FAFB",
																		borderRadius:
																			"0.375rem",
																		paddingBlock:
																			"2.3px",
																	}),
																}}
															/>
														)}
													/>
													{errors?.QnA?.[index]
														?.categories && (
														<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
															<ExclamationCircleIcon
																className="w-5 h-5 text-red-500"
																aria-hidden="true"
															/>
														</div>
													)}
												</div>
												{errors?.QnA?.[index]
													?.categories && (
													<p
														className="pl-2 mt-2 text-sm text-red-600/60"
														id="categories-error">
														{/* {
															errors?.QnA?.[index]
																?.categories
																?.message
														} */}
														Invalid Categories
													</p>
												)}
											</div>
										</section>
										<Button
											type="button"
											disabled={fields.length === 1}
											className="flex -translate-y-[8px] h-fit mt-9 col-span-full sm:col-span-2"
											onClick={() => {
												if (fields.length > 1) {
													remove(index)
												}
											}}>
											Delete
										</Button>
									</div>
								</div>
							)
						})}
						<div className="p-3 col-span-full">
							<Button
								type="button"
								className="flex ml-auto"
								onClick={() => {
									append({
										question: "",
										timeStamp: "",
										language: "EN",
										categories: [],
									})
								}}>
								Add a Question
							</Button>
						</div>
					</div>
					{/* Channel */}
					<div className="col-span-full md:col-span-6 ">
						<div className="flex justify-between px-1">
							<Label
								htmlFor="channel"
								value="Channel"
								className="block text-sm font-semibold leading-6 text-gray-900"
							/>
							<span
								className="text-sm leading-6 text-gray-500"
								id="channel-required">
								Required
							</span>
						</div>
						<div className="relative">
							<Controller
								name="channel"
								control={control}
								render={({ field }: any) => (
									<Select
										{...field}
										// isMulti
										className="h-full mb-4 rounded-lg bg-[#F9FAFB]"
										options={channels.selectOptions}
										placeholder="Channel"
										isSearchable
										onChange={(selectedOption) => {
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
							{errors?.channel && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon
										className="w-5 h-5 text-red-500"
										aria-hidden="true"
									/>
								</div>
							)}
						</div>
					</div>
					{/* Speaker */}
					<div className="col-span-full md:col-span-6 ">
						<div className="flex justify-between px-1">
							<Label
								htmlFor="speaker"
								value="Rabbi / Speaker"
								className="block text-sm font-semibold leading-6 text-gray-900"
							/>
							<span
								className="text-sm leading-6 text-gray-500"
								id="speaker-required">
								Required
							</span>
						</div>
						{/* <div className="mt-1">
							<div className="relative">
								<TextInput
									id="speaker"
									placeholder="Speaker"
									{...register("speaker")}
									className="focus:placeholder:opacity-0"
								/>
								{errors?.speaker && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<ExclamationCircleIcon
											className="w-5 h-5 text-red-500"
											aria-hidden="true"
										/>
									</div>
								)}
							</div>
							{errors?.speaker?.message && (
								<p className="pl-2 mt-2 text-sm text-red-400">
									{errors?.speaker.message}
								</p>
							)}
						</div> */}
						<div className="relative">
							{channelIsOther && (
								<Controller
									name="speaker"
									control={control}
									render={({ field }: any) => (
										<CreatableSelect
											{...field}
											isMulti
											isDisabled={speakerDisabled}
											options={allSpeakers && allSpeakers}
											placeholder="Speaker"
											isSearchable
											className={`${styles} h-full mb-4 rounded-lg bg-[#F9FAFB]`}
											onChange={(selectedOption) => {
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
							)}

							{!channelIsOther && (
								<Controller
									name="speaker"
									control={control}
									render={({ field }: any) => (
										<Select
											{...field}
											isMulti
											isDisabled={speakerDisabled}
											options={filteredSpeakers}
											placeholder="Speaker"
											isSearchable
											className={`${styles} h-full mb-4 rounded-lg bg-[#F9FAFB]`}
											onChange={(selectedOption) => {
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
							)}
							{errors?.channel && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon
										className="w-5 h-5 text-red-500"
										aria-hidden="true"
									/>
								</div>
							)}
						</div>
					</div>

					{/* Description */}
					<div className="col-span-full ">
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
									className="focus:placeholder:opacity-0"
								/>
								{errors?.description && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<ExclamationCircleIcon
											className="w-5 h-5 text-red-500"
											aria-hidden="true"
										/>
									</div>
								)}
							</div>
							{errors?.description?.message && (
								<p className="pl-2 mt-2 text-sm text-red-400">
									{errors?.description.message}
								</p>
							)}
						</div>
					</div>
				</div>
				<Button
					type="button"
					className="col-span-3 col-start-2 py-2 mt-4 text-2xl"
					onClick={() => reset()}>
					Reset Form
				</Button>

				<Button
					type="submit"
					disabled={isLoading}
					className={` ${
						isLoading ? "bg-zinc-100" : "bg-teal-400"
					}  py-2 mt-4 col-span-7 text-2xl`}>
					Submit
				</Button>
			</div>
		</form>
	)
}
export default QuestionAnswerForm
