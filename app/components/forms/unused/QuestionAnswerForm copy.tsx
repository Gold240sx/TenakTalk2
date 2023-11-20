"use client"
/* eslint-disable */
import React, { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import Select from "react-select"
import { Button, Label } from "flowbite-react"
import * as z from "zod"
import {
	useForm,
	SubmitHandler,
	// Controller,
} from "react-hook-form"

const QuestionAnswerSchema = z.object({
	question: z.string(),
	answer: z.string(),
})

const InitialData = [
	{
		question: "",
		answer: "",
	},
]

type FormValues = z.infer<typeof QuestionAnswerSchema>

const QuestionAnswerForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState(InitialData)
	const {
		register,
		handleSubmit,
		reset,
		// control,
		// watch,
		formState: { errors },
	} = useForm<FormValues[]>({
		// resolver: zodResolver(QuestionAnswerSchema),
	})

	const onSubmit: SubmitHandler<FormValues[]> = async (data) => {
		setIsLoading(true)
		await new Promise((resolve) => setTimeout(resolve, 2000))
		console.log("Form Data", data)
		setIsLoading(false)
		setFormData(InitialData)
		reset()
	}

	const handleAddQuestionAnswer = () => {
		setFormData([...formData, { question: "", answer: "" }])
	}

	const handleDelete = (index: number) => {
		const updatedFormData = [...formData]
		console.log(formData)
		const newData = () => {
			updatedFormData.filter((item) => {
				if (item[index] !== index) {
					return item
				}
			})
			return updatedFormData
		}
		setFormData(newData)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="w-full p-4 mt-4 bg-white/40 rounded-xl min-h-16">
				<h1 className="text-3xl text-yellow-500">QuestionForm</h1>
				<div className="grid grid-cols-12 mt-10 gap-x-6 gap-y-8">
					{/* start individual inputs */}
					{/* Render dynamic inputs for questions */}
					{formData.map((formItem, index) => (
						<div key={index} className="col-span-full">
							<label>Question:</label>
							<input
								type="text"
								onChange={(e) => {
									setFormData({
										...formData,
										question: e.target.value,
									})
								}}
								{...register(`formData[${index}].question`)}
							/>
							<label>Answer:</label>
							<input
								type="text"
								onChange={(e) => {
									setFormData({
										...formData,
										answer: e.target.value,
									})
								}}
								{...register(`formData[${index}].answer`)}
							/>
							<button
								type="button"
								onClick={() => handleDelete(index)}>
								Delete
							</button>
						</div>
					))}
					<Button
						type="button"
						onClick={handleAddQuestionAnswer}
						className="flex ml-auto whitespace-nowrap w-fit">
						Add Q & A
					</Button>
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
