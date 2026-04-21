import type { SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    error?: FieldError
    options: { value: string; label: string }[]
    placeholder?: string
}

const SelectField = ({ label, error, options, placeholder, id, ...props }: SelectFieldProps) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={id}
                {...props}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white ${error ? 'border-red-400' : 'border-gray-300'
                    }`}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
    )
}

export default SelectField
