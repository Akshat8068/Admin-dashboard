import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '@/store/api/authApi'
import { login } from '@/store/slices/authSlice'
import { FormBuilder, type FieldConfig } from '@/components/common/FormBuilder'

const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().regex(/^\d{8,12}$/, 'Phone must be 8–12 digits'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(8, 'Password must be at most 8 characters')
        .regex(/(?=.*[a-zA-Z])(?=.*\d)/, 'Password must include letters and numbers'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null)
    const [registerMutation, { isLoading }] = useRegisterMutation()

    const onSubmit = async (data: RegisterFormData) => {
        setError(null)
        try {
            const result = await registerMutation({
                name: data.fullName,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                phone: data.phone,
                address: data.address,
                isAdmin: false,
            }).unwrap()
            dispatch(login({ user: result.data.user, tokens: result.data.tokens }))
            navigate('/')
        } catch {
            setError('Registration failed. Please try again.')
        }
    }

    const fields: FieldConfig<RegisterFormData>[] = [
        {
            name: 'fullName',
            label: 'Full Name',
            type: 'text',
            placeholder: 'John Doe',
            required: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'you@example.com',
            required: true,
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'text',
            placeholder: 'Enter phone number',
            required: true,
        },
        {
            name: 'address',
            label: 'Address',
            type: 'text',
            placeholder: 'Enter your address',
            required: true,
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: '••••••••',
            required: true,
            description: 'Min 6, max 8 characters with letters and numbers',
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: '••••••••',
            required: true,
        },
    ]

    return (
        <div className="space-y-6 w-full">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to get started</p>
            </div>

            <FormBuilder<RegisterFormData>
                fields={fields}
                validation={registerSchema}
                defaultValues={{ fullName: '', email: '', phone: '', address: '', password: '', confirmPassword: '' }}
                onSubmit={onSubmit}
                submitText="Register"
                loading={isLoading}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 underline font-medium hover:text-indigo-800">
                    Login
                </Link>
            </p>
        </div>
    )
}

export default Register
