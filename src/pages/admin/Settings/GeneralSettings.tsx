import { z } from 'zod';
import { FormBuilder } from '@/components/common/FormBuilder';
import type { FieldConfig } from '@/components/common/FormBuilder';

const schema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Enter valid phone number'),
    gender: z.string().min(1, 'Select gender'),
    dob: z.date().optional(),
});

type GeneralForm = z.infer<typeof schema>;

const fields: FieldConfig<GeneralForm>[] = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 9876543210', required: true },
    {
        name: 'gender', label: 'Gender', type: 'select', placeholder: 'Select gender', required: true,
        options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
        ],
    },
    { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: 'Select date' },
];

const GeneralSettings = () => {
    const handleSubmit = async (data: GeneralForm) => {
        console.log('General settings saved:', data);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Profile Information</h2>
            <p className="text-sm text-gray-500 mb-6">Update your personal details</p>
            <FormBuilder<GeneralForm>
                fields={fields}
                defaultValues={{ name: 'Admin User', email: 'admin@ezmart.com', phone: '+91 9876543210', gender: 'male' }}
                validation={schema}
                onSubmit={handleSubmit}
                submitText="Save Changes"
                submitClassName="max-w-xs"
            />
        </div>
    );
};

export default GeneralSettings;
