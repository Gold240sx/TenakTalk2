import Swal from "sweetalert2"

function showAlert({ text, status }: { text: string; status: "OK" | "ERR" }) {
	Swal.fire({
		title: status === "OK" ? "Success" : "UH-OH",
		text: text,
		icon: status === "OK" ? "success" : "error",
		confirmButtonText: status === "OK" ? "Nice!" : "Aww Man",
	})
}

function getAllSpeakers(channels: any) {
	// Accumulate all speakers into a flat array
	const allSpeakers = channels.reduce((acc: any, channel: any) => {
		// Concatenate speakers to the accumulator array
		return acc.concat(channel.speakers)
	}, [])

	// Remove duplicates and create an array of objects with value and label properties
	const uniqueSpeakers = Array.from(new Set(allSpeakers))
		.filter((speaker) => {
			// Check if speaker exists and has the necessary properties
			return (
				speaker &&
				typeof speaker === "string" && // Assuming speaker is a string
				speaker.trim() !== "" &&
				speaker !== "Other"
			)
		})
		.map((speaker) => ({
			value: speaker,
			label: speaker,
		}))

	return uniqueSpeakers
}

export { showAlert, getAllSpeakers }
