"use client"
/* eslint-disable */
import React, { useState } from "react"
import { Button, Label, TextInput } from "flowbite-react"
import { getMonth, getDate, format, getYear } from "date-fns"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import * as z from "zod"
import {
	useForm,
	useFieldArray,
	FieldErrors,
	useWatch,
	Controller,
	SubmitHandler,
} from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/shadcn/ui/form"

const date = new Date()
// const currentYear = format(date, "yy")
const currentYear = getYear(date)
const currentMonth = getMonth(date)
const currentDay = getDate(date)

const QAFormSchema = z.object({
	showDate: z
		.object({
			MM: z.number().int().min(1).max(12),
			// .transform((v) => Number(v) || 0),
			DD: z.number().int().min(1).max(31),
			// .transform((v) => Number(v) || 0),
			YY: z.number().min(1).max(currentYear),
			// .transform((v) => Number(v) || 0),
		})
		.optional(),
	QnA: z.array(
		z.object({
			question: z
				.string()
				.min(1, { message: "Please enter a valid Question" }),
			timeStamp: z
				.string()
				.min(5, { message: "Time Stamp required" })
				.url({ message: "Invalid URL" }),
		})
	),
})

type FormValues = z.infer<typeof QAFormSchema>

function QuestionAnswerForm() {
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			QnA: [{ question: "", timeStamp: "" }],
			showDate: {
				DD: currentDay,
				MM: currentMonth,
				YY: currentYear,
			},
		},
		mode: "onBlur",
	})
	const { fields, append, remove } = useFieldArray({
		name: "QnA",
		control,
	})

	const onSubmit = (data: FormValues | FormValues[]) => {
		setIsLoading(true)
		// await new Promise((resolve) => setTimeout(resolve, 2000))
		console.log("Form Data", data)
		setIsLoading(false)
		// reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid w-full grid-cols-12 gap-4 p-4 mt-4 bg-white/40 rounded-xl min-h-16">
				<h1 className="text-3xl text-yellow-500">QuestionForm</h1>
				<p className="col-span-full">Upload your question</p>
				{/* <div className="grid grid-cols-12 mt-10 gap-x-6 gap-y-8"> */}
				<div className=" col-span-full">
					{/* start individual inputs */}
					{/* Render dynamic inputs for questions */}
					<div className="rounded-xl sm:bg-white sm:p-3">
						{fields.map((field, index) => {
							return (
								<div
									key={field.id}
									className="flex flex-col gap-4 ">
									<div className="grid grid-cols-12 gap-4 p-3 my-3 bg-white sm:my-0 rounded-xl sm:bg-transparent">
										<section className="col-span-full sm:col-span-5">
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
												<div className="relative">
													<TextInput
														id={`question-${index}`}
														placeholder="Question"
														{...register(
															`QnA.${index}.question` as const,
															{
																required: true,
															}
														)}
														className={
															errors?.QnA?.[index]
																?.question
																? "error"
																: "w-full"
														}
														defaultValue={
															field.question
														}
													/>
													{errors?.QnA?.[index]
														?.question && (
														<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
														className="pl-2 mt-2 text-sm text-red-600/60"
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
										<Button
											type="button"
											disabled={fields.length === 1}
											className="flex mt-auto col-span-full sm:col-span-2"
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
									})
								}}>
								Add a Question
							</Button>
						</div>
					</div>
					<div className="gap-1 p-3 w-fit">
						<div className="relative col-span-6 px-1 mb-2">
							<Label
								htmlFor="showDate"
								value="Show Date"
								className="text-xl font-semibold leading-6 text-gray-900 "
							/>
						</div>
						<div className="grid grid-cols-6 gap-2 px-2 ">
							<div className="col-span-1 w-fit">
								<Label
									htmlFor="showDate.mm"
									value="MM"
									className="px-1 text-sm font-semibold leading-6 text-gray-900 "
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
							<div className="col-span-1 w-fit">
								<Label
									htmlFor="showDate.dd"
									value="DD"
									className="px-1 text-sm font-semibold leading-6 text-gray-900 "
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
							<div className="col-span-1 w-fit">
								<Label
									htmlFor="showDate.yy"
									value="YYYY"
									className="px-1 text-sm font-semibold leading-6 text-gray-900 "
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
				</div>
				<Button
					type="button"
					className="col-span-3 col-start-2 py-2 mt-4 text-2xl"
					onClick={() =>
						reset({
							QnA: [{ question: "", timeStamp: "" }],
						})
					}>
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
			{/* <FormMessage /> */}
		</form>
	)
}
export default QuestionAnswerForm
