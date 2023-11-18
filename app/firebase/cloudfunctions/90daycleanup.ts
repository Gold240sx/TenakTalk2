// const functions = require("firebase-functions")
// const admin = require("firebase-admin")
// admin.initializeApp()

// const { Storage } = require("@google-cloud/storage")
// const storage = new Storage()

// const bucket = storage.bucket("your-firebase-storage-bucket")

// exports.cleanupFiles = functions.pubsub
// 	.schedule("every 24 hours")
// 	.onRun(async (context) => {
// 		const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000

// 		try {
// 			// List files in the specific folder
// 			const [files] = await bucket.getFiles({ prefix: "your-folder/" })

// 			// Iterate through files and delete files older than 90 days
// 			await Promise.all(
// 				files
// 					.filter((file) => file.metadata.timeCreated < ninetyDaysAgo)
// 					.map((file) => file.delete())
// 			)

// 			console.log("Files older than 90 days deleted successfully.")
// 			return null
// 		} catch (error) {
// 			console.error("Error cleaning up files:", error)
// 			return null
// 		}
// 	})

//  to deploy
// firebase deploy --only functions

// es6 version
// import * as functions from "firebase-functions"
// import * as admin from "firebase-admin"
// admin.initializeApp()

// import { Storage } from "@google-cloud/storage"
// const storage = new Storage()

// const bucket = storage.bucket("your-firebase-storage-bucket")

// exports.cleanupFiles = functions.pubsub
// 	.schedule("every 24 hours")
// 	.onRun(async (context) => {
// 		const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000

// 		try {
// 			// List files in the specific folder
// 			const [files] = await bucket.getFiles({ prefix: "your-folder/" })

// 			// Iterate through files and delete files older than 90 days
// 			await Promise.all(
// 				files
// 					.filter((file) => file.metadata.timeCreated < ninetyDaysAgo)
// 					.map((file) => file.delete())
// 			)

// 			console.log("Files older than 90 days deleted successfully.")
// 			return null
// 		} catch (error) {
// 			console.error("Error cleaning up files:", error)
// 			return null
// 		}
// 	})
