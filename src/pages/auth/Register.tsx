import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { useRegisterMutation } from '@/store/api/authApi'
import { login } from '@/store/slices/authSlice'
import { mockAuthService } from '@/utils/mockAuth'
import { FormBuilder, type FieldConfig } from '@/components/common/FormBuilder'
import OtpField from '@/components/common/OtpField'
import { Input } from '@/components/UI/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select'

const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Please enter a valid email'),
    countryCode: z.string().min(1, 'Country code is required'),
    mobile: z.string().regex(/^\d{8,12}$/, 'Mobile must be 8–12 digits'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(8, 'Password must be at most 8 characters')
        .regex(/(?=.*[a-zA-Z])(?=.*\d)/, 'Password must include letters and numbers'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    hasReferral: z.boolean(),
    referralCode: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
}).refine(d => !d.hasReferral || (d.referralCode && d.referralCode.length > 0), {
    message: 'Referral code is required',
    path: ['referralCode'],
})

type RegisterFormData = z.infer<typeof registerSchema>
type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken'

const COUNTRY_CODES = [
    { value: '+91', label: 'India (+91)', digits: 10 },
    { value: '+1', label: 'USA (+1)', digits: 10 },
    { value: '+44', label: 'UK (+44)', digits: 10 },
    { value: '+61', label: 'Australia (+61)', digits: 9 },
    { value: '+971', label: 'UAE (+971)', digits: 9 },
    { value: '+65', label: 'Singapore (+65)', digits: 8 },
    { value: '+49', label: 'Germany (+49)', digits: 10 },
    { value: '+81', label: 'Japan (+81)', digits: 10 },
    { value: '+86', label: 'China (+86)', digits: 11 },
    { value: '+55', label: 'Brazil (+55)', digits: 11 },
]

const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
]

// ─── Register Component ────────────────────────────────────────────────────────
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, seterror] = useState<string | null>(null)
    const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle')
    const [emailVerified, setEmailVerified] = useState(false)
    const [mobileVerified, setMobileVerified] = useState(false)
    const [watchedEmail, setWatchedEmail] = useState('')
    const [watchedMobile, setWatchedMobile] = useState('')
    const [watchedCountryCode, setWatchedCountryCode] = useState('+91')
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [registerMutation, { isLoading }] = useRegisterMutation()

    
    useEffect(() => { setEmailVerified(false) }, [watchedEmail])
    useEffect(() => { setMobileVerified(false) }, [watchedMobile, watchedCountryCode])

    const handleUsernameCheck = (username: string) => {
        if (!username || username.length < 3) { setUsernameStatus('idle'); return }
        setUsernameStatus('checking')
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            const result = await mockAuthService.checkUsername(username)
            setUsernameStatus(result.available ? 'available' : 'taken')
        }, 600)
    }

    const canSubmit = emailVerified && mobileVerified && usernameStatus !== 'taken' && usernameStatus !== 'checking'

    const onSubmit = async (data: RegisterFormData) => {
        if (!canSubmit) return
        seterror(null)
        try {
            const result = await registerMutation(data).unwrap()
            dispatch(login({ user: result.data.user, token: result.data.token }))
            navigate('/')
        } catch {
            seterror('Registration failed. Please try again.')
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

            name: 'username',
            label: 'Username',
            type: 'custom',
            required: true,
            render: (field, fieldState) => (
                <div className="space-y-1">
                    <div className="relative">
                        <Input
                            {...field}
                            placeholder="johndoe"
                            className={fieldState.error ? 'border-red-400 pr-8' : 'pr-8'}
                            onChange={e => {
                                field.onChange(e)
                                handleUsernameCheck(e.target.value)
                            }}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                            {usernameStatus === 'checking' && <Loader2 size={15} className="animate-spin text-gray-400" />}
                            {usernameStatus === 'available' && <CheckCircle2 size={15} className="text-green-500" />}
                            {usernameStatus === 'taken' && <XCircle size={15} className="text-red-500" />}
                        </span>
                    </div>
                    {!fieldState.error && usernameStatus === 'checking' && <p className="text-xs text-gray-400">Checking availability...</p>}
                    {!fieldState.error && usernameStatus === 'available' && <p className="text-xs text-green-500">Username is available</p>}
                    {!fieldState.error && usernameStatus === 'taken' && <p className="text-xs text-red-500">Username is already taken</p>}
                </div>
            ),
        },
        {
            // Email + OTP — type: custom
            name: 'email',
            label: 'Email',
            type: 'custom',
            required: true,
            render: (field, fieldState) => {
                const isValidEmail = field.value && !fieldState.error && z.string().email().safeParse(field.value).success
                return (
                    <div className="space-y-2">
                        <Input
                            {...field}
                            type="email"
                            placeholder="you@example.com"
                            className={fieldState.error ? 'border-red-400' : ''}
                            onChange={e => { field.onChange(e); setWatchedEmail(e.target.value) }}
                        />
                        {isValidEmail && (
                            <OtpField
                                label="Email"
                                target={field.value}
                                verified={emailVerified}
                                onSend={() => mockAuthService.sendOtp(field.value).then(() => { })}
                                onVerify={async otp => {
                                    const r = await mockAuthService.verifyOtp(field.value, otp)
                                    if (!r.verified) throw new Error('Invalid OTP')
                                    setEmailVerified(true)
                                }}
                            />
                        )}
                        {isValidEmail && !emailVerified && (
                            <p className="text-xs text-amber-500">Please verify your email to continue</p>
                        )}
                    </div>
                )
            },
        },
        {
            // Country Code + Mobile + OTP — type: custom
            name: 'mobile',
            label: 'Mobile Number',
            type: 'custom',
            required: true,
            render: (field, fieldState, watch) => {
                const cc = watch('countryCode') || watchedCountryCode
                const selectedCountry = COUNTRY_CODES.find(c => c.value === cc)
                const isValidMobile = field.value && field.value.match(/^\d{8,12}$/) && !fieldState.error
                return (
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <div className="w-44 shrink-0">
                                <Select
                                    value={cc}
                                    onValueChange={val => { setWatchedCountryCode(val) }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COUNTRY_CODES.map(c => (
                                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1 relative">
                                <Input
                                    {...field}
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    className={cn(fieldState.error ? 'border-red-400' : '', 'pr-16')}
                                    onChange={e => { field.onChange(e); setWatchedMobile(e.target.value) }}
                                />
                                {selectedCountry && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                                        {selectedCountry.digits} digits
                                    </span>
                                )}
                            </div>
                        </div>
                        {isValidMobile && (
                            <OtpField
                                label="Mobile"
                                target={`${cc}${field.value}`}
                                verified={mobileVerified}
                                onSend={() => mockAuthService.sendOtp(`${cc}${field.value}`).then(() => { })}
                                onVerify={async otp => {
                                    const r = await mockAuthService.verifyOtp(`${cc}${field.value}`, otp)
                                    if (!r.verified) throw new Error('Invalid OTP')
                                    setMobileVerified(true)
                                }}
                            />
                        )}
                        {isValidMobile && !mobileVerified && (
                            <p className="text-xs text-amber-500">Please verify your mobile number to continue</p>
                        )}
                    </div>
                )
            },
        },
        {
            name: 'countryCode',
            label: 'Country Code',
            type: 'select',
            required: true,
            options: COUNTRY_CODES.map(c => ({ value: c.value, label: c.label })),
            className: 'hidden', // hidden — managed inside mobile custom field
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
        {
            name: 'hasReferral',
            label: 'Have a referral code?',
            type: 'switch',
            placeholder: 'Have a referral code?',
        },
        {
            name: 'referralCode',
            label: 'Referral Code',
            type: 'text',
            placeholder: 'Enter referral code',
            required: true,
            conditional: { field: 'hasReferral', value: true },
        },
        {
            name: 'dateOfBirth',
            label: 'Date of Birth (optional)',
            type: 'date',
        },
        {
            name: 'gender',
            label: 'Gender (optional)',
            type: 'select',
            placeholder: 'Select gender',
            options: GENDER_OPTIONS,
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
                defaultValues={{ hasReferral: false, countryCode: '+91' }}
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

// cn utility needed inside render functions
function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ')
}

export default Register
