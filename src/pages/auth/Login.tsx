import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '@/store/api/authApi'
import { login } from '@/store/slices/authSlice'
import { FormBuilder, type FieldConfig } from '@/components/common/FormBuilder'
import { useState } from 'react'

const loginSchema = z.object({
    email: z.string().min(1, 'Email or username is required').refine(
        val => !val.includes('@') || z.string().email().safeParse(val).success,
        'Please enter a valid email address'
    ),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

const loginFields: FieldConfig<LoginFormData>[] = [
    {
        name: 'email',
        label: 'Email / Username',
        type: 'email',
        placeholder: 'you@example.com or username',
        required: true,
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        required: true,
    },
]

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, seterror] = useState<string | null>(null)
    const [loginMutation, { isLoading }] = useLoginMutation()

    const onSubmit = async (data: LoginFormData) => {
        seterror(null)
        try {
            const result = await loginMutation(data).unwrap()
            const user = { ...result.data.user, isAdmin: result.data.user.isAdmin ?? false }
            dispatch(login({ user, tokens: result.data.tokens }))
            navigate(user.isAdmin ? '/dashboard' : '/')
            console.log(result)
        } catch {
            seterror('Invalid email or password')
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
                <p className="text-sm text-gray-500 mt-1">Enter your credentials to continue</p>
            </div>

            <FormBuilder<LoginFormData>
                fields={loginFields}
                validation={loginSchema}
                onSubmit={onSubmit}
                submitText="Login"
                loading={isLoading}
            />

            {error && <p className="text-xs text-red-500 -mt-4">{error}</p>}

            <p className="text-sm text-center text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-600 underline font-medium hover:text-indigo-800">
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default Login
