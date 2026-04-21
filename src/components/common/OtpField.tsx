import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface OtpFieldProps {
    label: string
    target: string
    verified: boolean
    onSend: () => Promise<void>
    onVerify: (otp: string) => Promise<void>
}

const OtpField = ({ label, target, verified, onSend, onVerify }: OtpFieldProps) => {
    const [sent, setSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [sending, setSending] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cooldown, setCooldown] = useState(0)

    const startCooldown = () => {
        setCooldown(30)
        const interval = setInterval(() => {
            setCooldown(prev => {
                if (prev <= 1) { clearInterval(interval); return 0 }
                return prev - 1
            })
        }, 1000)
    }

    const handleSend = async () => {
        if (!target || sending || cooldown > 0) return
        setSending(true)
        setError(null)
        setOtp('')
        try {
            await onSend()
            setSent(true)
            startCooldown()
        } catch {
            setError('Failed to send OTP')
        } finally {
            setSending(false)
        }
    }

    const handleVerify = async () => {
        if (!otp || verifying) return
        setVerifying(true)
        setError(null)
        try {
            await onVerify(otp)
        } catch {
            setError('Invalid OTP. Please try again.')
            setOtp('')
        } finally {
            setVerifying(false)
        }
    }

    if (verified) {
        return (
            <div className="flex items-center gap-2 text-sm text-green-600 py-1">
                <CheckCircle2 size={16} />
                <span>{label} verified</span>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{label} OTP</span>
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={sending || cooldown > 0 || !target}
                    className="text-xs text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                    {sending && <Loader2 size={12} className="animate-spin" />}
                    {cooldown > 0 ? `Resend in ${cooldown}s` : sent ? 'Resend OTP' : 'Send OTP'}
                </button>
            </div>

            {sent && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 4-digit OTP"
                        className={`flex-1 px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${error ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={otp.length < 4 || verifying}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition flex items-center gap-1"
                    >
                        {verifying && <Loader2 size={13} className="animate-spin" />}
                        Verify
                    </button>
                </div>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}
            {sent && !error && <p className="text-xs text-gray-400">OTP sent console </p>}
        </div>
    )
}

export default OtpField
