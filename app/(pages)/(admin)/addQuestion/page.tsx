import React from "react"
import QuestionForm from "@components/questionForm"

const AddQuestion: React.FC = () => {
	return (
		<div className="z-10">
			<h1 className="py-4 text-4xl">Question Upload</h1>
			<p className="text-zinc-600">upload your question</p>
			<QuestionForm />
		</div>
	)
}

export default AddQuestion
