import type { InputHTMLAttributes, ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: FieldError
    otherElement?: ReactNode
}

const FormField = ({ label, error, otherElement: rightElement, id, ...props }: FormFieldProps) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    {...props}
                    className={`w-full px-4 py-2.5 ${rightElement ? 'pr-10' : ''} rounded-lg border text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${error ? 'border-red-400' : 'border-gray-300'
                        }`}
                />
                {rightElement && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
                )}
            </div>
            {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
    )
}

export default FormField
