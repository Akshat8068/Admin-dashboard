import { z } from 'zod';
import { FormBuilder } from '@/components/common/FormBuilder';
import type { FieldConfig } from '@/components/common/FormBuilder';

const schema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(d => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type SecurityForm = z.infer<typeof schema>;

const fields: FieldConfig<SecurityForm>[] = [
    { name: 'currentPassword', label: 'Current Password', type: 'password', placeholder: 'Enter current password', required: true },
    { name: 'newPassword', label: 'New Password', type: 'password', placeholder: 'Enter new password', required: true },
    { name: 'confirmPassword', label: 'Confirm New Password', type: 'password', placeholder: 'Confirm new password', required: true },
];

const SecuritySettings = () => {
    const handleSubmit = async (data: SecurityForm) => {
        console.log('Password changed:', data);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Change Password</h2>
            <p className="text-sm text-gray-500 mb-6">Keep your account secure with a strong password</p>
            <FormBuilder<SecurityForm>
                fields={fields}
                defaultValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                validation={schema}
                onSubmit={handleSubmit}
                submitText="Update Password"
                submitClassName="max-w-xs"
            />
        </div>
    );
};

export default SecuritySettings;
