import { storage, ref, uploadBytes, getDownloadURL } from "./firebaseInit"

type UploadParamTypes = {
	file: File
	filePath: string
}

interface UploadResult {
	success: boolean
	url?: string
	error?: string
}

const allowedFileExtensions = ["pdf", "word", "doc", "docx", "rtf"]
const maxFileSizeInBytes = 10 * 1024 * 1024 // 10 MB
const fileExtensionValidator = (value: string) => {
	const extension = value.split(".").pop()
	return allowedFileExtensions.includes(extension || "")
}
const fileSizeValidator = (value: File) => {
	return value.size <= maxFileSizeInBytes
}

const uploadToFirebaseStorage = async ({
	file,
	filePath,
}: UploadParamTypes): Promise<UploadResult> => {
	try {
		// Create a storage reference with the specified file path
		const storageRef = ref(storage, filePath)

		// Upload the file to Firebase Storage
		await uploadBytes(storageRef, file)

		// Get the download URL of the uploaded file
		const downloadURL = await getDownloadURL(storageRef)

		return { success: true, url: downloadURL }
	} catch (error: any) {
		return { success: false, error: error.message }
	}

	{
		/*  TO USE:
        const handleUpload = async (file: any) => {
            if (resumeInputRef.current?.files?.length) {
                const file = resumeInputRef.current.files[0]
                const filePath = `jobApplications/test/${file.name}` // Replace with your desired file path
                const result = await uploadToFirebaseStorage({ file, filePath })
                setUploadResult(result)
            }
        }
    */
	}
}

export { uploadToFirebaseStorage, type UploadResult }
export { fileExtensionValidator, fileSizeValidator }
