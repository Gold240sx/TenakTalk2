"use client"
import React, { useState, ChangeEvent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import {
	Button,
	Label,
	TextInput,
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
	// Controller,
	// FieldErrors,
} from "react-hook-form"
import { createDocument } from "@/app/firebase/storeFunctions"

type FormValue = {
	question: string
	url: string
}

const FormSchema = z.object({
	question: z.string().min(1),
	url: z.string().refine(
		(value) => {
			try {
				new URL(value)
				return true
			} catch {
				return false
			}
		},
		{
			message: "Must be a valid URL",
		}
	),
})

const QuestionForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState<FormValue>({
		question: "",
		url: "",
	})
	const {
		// control,
		register,
		handleSubmit,
		reset,
		// watch,
		formState: { errors },
	} = useForm<FormValue>({
		resolver: zodResolver(FormSchema),
	})

	type Inputs = z.infer<typeof FormSchema>

	const processForm: SubmitHandler<Inputs> = async (data) => {
		setIsLoading(true) // Set loading state to true while submitting

		// Simulate an asynchronous process, like sending data to the server
		await new Promise((resolve) => setTimeout(resolve, 2000)) // Replace this with your actual data submission logic

		// add data to firebase
		const formSubmitResult = await createDocument({
			data: data,
			collectionName: "questions",
		})

		if (formSubmitResult.status === "OK") {
			console.log("the document was successfully added")
		} else {
			console.log("there was an error uploading the file")
		}

		console.log("Form Data", data)
		setIsLoading(false)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<div className="w-full p-4 mt-4 bg-white/40 rounded-xl min-h-16">
				<h1 className="text-3xl text-yellow-500">QuestionForm</h1>
				<div className="grid grid-cols-12 mt-10 gap-x-6 gap-y-8">
					{/* start individual inputs */}
					<div className="col-span-full md:col-span-6 ">
						<div className="flex justify-between px-1">
							<Label
								htmlFor="question"
								value="First Name"
								className="block text-sm font-semibold leading-6 text-gray-900"
							/>
							<span
								className="text-sm leading-6 text-gray-500"
								id="firstName-required">
								Required
							</span>
						</div>
						<div className="mt-1">
							<div className="relative">
								<TextInput
									id="firstName"
									type="text"
									placeholder="The Question"
									{...register("question")}
									value={formData.question}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFormData({
											...formData,
											question: e.target.value,
										})
									}
									className="focus:placeholder:opacity-0"
								/>
								{errors.question && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<ExclamationCircleIcon
											className="w-5 h-5 text-red-500"
											aria-hidden="true"
										/>
									</div>
								)}
							</div>
							{errors.question?.message && (
								<p className="pl-2 mt-2 text-sm text-red-400">
									{errors.question.message}
								</p>
							)}
						</div>
					</div>
					{/*  */}
					<div className="col-span-full md:col-span-6 ">
						<div className="flex justify-between px-1">
							<Label
								htmlFor="url"
								value="URL"
								className="block text-sm font-semibold leading-6 text-gray-900"
							/>
							<span
								className="text-sm leading-6 text-gray-500"
								id="url-required">
								Required
							</span>
						</div>
						<div className="mt-1">
							<div className="relative">
								<TextInput
									id="url"
									type="text"
									placeholder="URL"
									{...register("url")}
									value={formData.url}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFormData({
											...formData,
											url: e.target.value,
										})
									}
									className="focus:placeholder:opacity-0"
								/>
								{errors.url && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<ExclamationCircleIcon
											className="w-5 h-5 text-red-500"
											aria-hidden="true"
										/>
									</div>
								)}
							</div>
							{errors.url?.message && (
								<p className="pl-2 mt-2 text-sm text-red-400">
									{errors.url.message}
								</p>
							)}
						</div>
					</div>
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

export default QuestionForm
