"use client"
import React from "react"
import { Button } from "@components/shadcn/ui/button"
import { useToast } from "@components/shadcn/ui/use-toast"

export function ToastWithTitle() {
	const { toast } = useToast()

	return (
		<Button
			variant="outline"
			onClick={() => {
				toast({
					title: "Data Output.",
					description: "nope",
				})
			}}>
			Show Toast
		</Button>
	)
}
