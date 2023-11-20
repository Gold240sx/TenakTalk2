import React from "react"
import ReactSelect from "react-select"
import OptionsType from "react-select"
import { Controller, UseFormReturn, FieldValues } from "react-hook-form"

type CustomOptionType = {
	name: string
	value: string | number
}

interface ControlledReactSelectProps {
	options: OptionsType[]
	formMethods: UseFormReturn<FieldValues>
}

const ControlledReactSelect: React.FC<ControlledReactSelectProps> = ({
	options,
	formMethods,
}) => {
	const { control } = formMethods

	return (
		<Controller
			control={control}
			name="customSelect"
			render={({ field }: any) => (
				<ReactSelect<CustomOptionType>
					{...field}
					options={options}
					getOptionLabel={(option) => option.name}
					onChange={(selectedOption) => {
						field.onChange(selectedOption)
					}}
					onBlur={() => {
						field.onBlur()
					}}
				/>
			)}
		/>
	)
}

export default ControlledReactSelect

{
	/*EXAMPLE USAGE: 
	import { useForm } from 'react-hook-form';
	import ControlledReactSelect from './ControlledReactSelect'; 

	FormComponent: React:FC = () => {
		const { handleSubmit, control } = useForm();

		return (
			<ControlledReactSelect 
				formMethods={{ control }} 
				options={[
					{ value: 1, name: 'One' },
					{ value: 2, name: 'Two' },
				]} 
			/>
		)
	}

*/
}
