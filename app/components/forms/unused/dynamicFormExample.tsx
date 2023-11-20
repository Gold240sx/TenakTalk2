"use client"
import React from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"

function QuestionAnswerForm() {
	const { register, control, handleSubmit, reset } = useForm({
		defaultValues: {
			test: [{ firstName: "Bill", lastName: "Luo" }],
		},
	})
	const { fields, append, remove } = useFieldArray({
		control,
		name: "test",
	})

	const onSubmit = (data: any) => console.log("data", data)

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Field Array </h1>
			<p>The following demo allow you to delete, append, prepend items</p>
			<ul>
				{fields.map((item, index) => {
					return (
						<li key={item.id}>
							<input
								{...register(`test.${index}.firstName`, {
									required: true,
								})}
							/>

							<Controller
								render={({ field }) => <input {...field} />}
								name={`test.${index}.lastName`}
								control={control}
							/>
							<button type="button" onClick={() => remove(index)}>
								Delete
							</button>
						</li>
					)
				})}
			</ul>
			<section>
				<button
					type="button"
					onClick={() => {
						append({
							firstName: "appendBill",
							lastName: "appendLuo",
						})
					}}>
					append
				</button>

				<button
					type="button"
					onClick={() =>
						reset({
							test: [{ firstName: "Bill", lastName: "Luo" }],
						})
					}>
					reset
				</button>
			</section>

			<input type="submit" />
		</form>
	)
}
export default QuestionAnswerForm
