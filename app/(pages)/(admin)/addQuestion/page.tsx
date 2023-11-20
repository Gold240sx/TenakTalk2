import React from "react"
// import QuestionForm from "@/app/components/forms/questionForm"
import QuestionAnswerForm from "@/app/components/forms/QuestionAnswerForm"

const AddQuestion: React.FC = () => {
	return (
		<div className="z-10 w-full">
			<h1 className="py-4 text-4xl">Question Upload</h1>
			<p className="text-zinc-600">upload your question</p>
			<QuestionAnswerForm />
		</div>
	)
}

export default AddQuestion
