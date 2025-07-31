import type { ComponentProps } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { tv } from 'tailwind-variants'

const inputVariants = tv({
  base: 'text-black w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors',
  variants: {
    variant: {
      default: 'placeholder:text-gray-600',
      select: 'text-gray-700 appearance-none bg-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const labelVariants = tv({
  base: 'mb-2 block text-sm font-medium text-gray-700',
})

type InputProps = {
  id: string
  name: string
  label: string
  type?: 'text' | 'date' | 'number' | 'select'
  placeholder?: string
  required?: boolean
  min?: number
  defaultValue?: string | number
  options?: { value: string; label: string }[]
} & ComponentProps<'input'>

export const Input = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  min,
  defaultValue,
  options,
  onChange,
  ...props
}: InputProps) => {
  const inputClasses = inputVariants({
    variant: type === 'select' ? 'select' : 'default',
  })

  const labelClasses = labelVariants()

  if (type === 'select') {
    return (
      <div>
        <label htmlFor={id} className={labelClasses}>
          {label} {required && '*'}
        </label>
        <div className="relative">
          <select
            id={id}
            name={name}
            defaultValue={defaultValue}
            className={inputClasses}
            // @ts-expect-error - onChange is not a valid prop for select
            onChange={onChange}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value} className="text-gray-600">
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        min={min}
        defaultValue={defaultValue}
        className={inputClasses}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

export const InputForm = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  min,
  defaultValue,
  options,
}: InputProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          id={name}
          label={label}
          type={type}
          placeholder={placeholder}
          required={required}
          min={min}
          defaultValue={defaultValue}
          options={options}
        />
      )}
    />
  )
}
