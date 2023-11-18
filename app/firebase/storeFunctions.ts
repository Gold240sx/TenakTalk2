import {
	// auth,
	// User,
	// onAuthStateChanged,
	// createUserWithEmailAndPassword,
	// signInWithEmailAndPassword,
	serverTimestamp,
	// signOut,
	db,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	collection,
	doc,
	setDoc,
	getDoc,
	// storage,
	// ref,
	// uploadString,
	// getDownloadURL,
	// type Firestore,
} from "@firebase/firebaseInit"
// import { useState, useEffect } from "react"

// const readDocument = async ({
// 	collectionName,
// 	documentId,
// }: {
// 	collectionName: string
// 	documentId: string
// }) => {
// 	const docRef = doc(db, collectionName, documentId)
// 	const docSnapshot = await getDoc(docRef)

// 	if (docSnapshot.exists()) {
// 		const data = docSnapshot.data()
// 		// Handle the data
// 	} else {
// 		// Document doesn't exist
// 	}
// }

const createDocument = async ({
	collectionName,
	data,
}: {
	collectionName: string
	data: any
}) => {
	// add the created at timestamp to any document being added to the store
	const newDocData = {
		...data,
		createdAt: serverTimestamp(),
	}
	try {
		const docRef = await addDoc(collection(db, collectionName), newDocData)
		const docId = docRef.id
		return {
			status: "success",
			message: "Document successfully created",
			docRef,
			docId,
		}
	} catch (error) {
		return { status: "error", message: "Error creating document", error }
	}

	{
		/* To USE:
    async function onSubmit(data: FormValues) {
        try {
            const response = await createDocument({ collectionName: "supportRequests", data: data });

            if (response.status === "success") {
                showAlert({ text: "The form was successfully submitted", status: "OK" });
                    console.log("Document Reference:", response.docRef);
            } else {
                    showAlert({ text: "There was an error submitting the form", status: "ERR" });
                    console.error(response.error);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            showAlert({ text: "An unexpected error occurred", status: "ERR" });
        }
    }

    */
	}
}

interface UpdateDocumentParams {
	collectionName: string
	docId: string
	data: Record<string, any>
}

interface UpdateDocumentResult {
	status: "success" | "error"
	error?: string
}

const updateDocument = async ({
	collectionName,
	docId,
	data,
}: UpdateDocumentParams): Promise<UpdateDocumentResult> => {
	try {
		const docRef = doc(db, collectionName, docId)
		await updateDoc(docRef, data)
		return { status: "success" }
	} catch (error: any) {
		return { status: "error", error: error.message }
	}
	{
		/* TO USE
         const updateResponse = await updateDocument({
            collectionName: "jobApplicants",
            docId: docId,
            data: { resumeLink: resumeURL },
        });

        if (updateResponse.status === "success") {
            // Clear the form data if everything is successful
            setFormData({
                name: "",
                resumeLink: "",
            });
        } else {
            showAlert({ text: "Error updating document with resume URL", status: "ERR" });
            console.error(updateResponse.error);
        }
     */
	}
}

// const deleteDocument = async ({
// 	collectionName,
// 	documentId,
// }: {
// 	collectionName: string
// 	documentId: string
// }) => {
// 	const docRef = doc(db, collectionName, documentId)
// 	await deleteDoc(docRef)
// 	// Handle the delete operation
// }

export const getCollectionDocs = async ({
	collectionName,
}: {
	collectionName: string
}) => {
	const collectionRef = collection(db, collectionName)
	try {
		const data = await getDocs(collectionRef)
		const filteredData = data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		return filteredData
	} catch (err) {
		console.error(err)
	}
}

export const getCollectionDoc = async ({
	collectionName,
	docId,
}: {
	collectionName: string
	docId: string
}) => {
	const docRef = doc(db, collectionName, docId)
	const docSnapshot = await getDoc(docRef)

	try {
		if (docSnapshot.exists()) {
			const data = docSnapshot.data()
			const filteredData = {
				...data,
				id: docSnapshot.id,
			}
			return filteredData
		} else {
			console.log(
				"Document not found or there was an error with the data retrieval."
			)
			return null
		}
	} catch (err) {
		// console.error(err)
		console.log(err)
		return null
	}
}

export {
	collection,
	db,
	addDoc,
	getDocs,
	updateDocument,
	updateDoc,
	deleteDoc,
	doc,
	setDoc,
	getDoc,
	createDocument,
}
