import React, { useState } from 'react';
import { useForm, Controller, type FieldValues, type Path, type DefaultValues, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';
import { Eye, EyeOff, Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DatePicker } from '@/components/ui/datepicker';
import { cn } from '@/utils';

export type FieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'switch'
    | 'date'
    | 'custom';

export interface Option {
    label: string;
    value: string | number;
}

export interface FieldConfig<T extends FieldValues> {
    name: Path<T>;
    label: string;
    type: FieldType;
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    options?: Option[];
    className?: string;
    render?: (field: any, fieldState: any, watch: (name: Path<T>) => any) => React.ReactNode;
    conditional?: {
        field: Path<T>;
        value: any;
        operator?: 'equals' | 'not_equals';
    };
}

export interface FormConfig<T extends FieldValues> {
    fields: FieldConfig<T>[];
    defaultValues?: DefaultValues<T>;
    validation?: ZodSchema<T>;
    onSubmit: (data: T) => Promise<void> | void;
    onCancel?: () => void;
    submitText?: string;
    cancelText?: string;
    className?: string;
    submitClassName?: string;
    loading?: boolean;
    disabled?: boolean;
}

function PasswordField({ field, placeholder, disabled }: { field: any; placeholder?: string; disabled?: boolean }) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <Input
                {...field}
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                disabled={disabled}
                className="pr-10"
            />
            <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
            >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}

function renderField<T extends FieldValues>(
    fieldConfig: FieldConfig<T>,
    field: any,
    fieldState: any,
    watch: (name: Path<T>) => any
) {
    const { type, placeholder, options, disabled, render } = fieldConfig;
    const hasError = !!fieldState.error;

    if (render) return render(field, fieldState, watch);

    switch (type) {
        case 'text':
        case 'email':
        case 'number':
            return (
                <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={hasError ? 'border-red-400 focus-visible:ring-red-400' : ''}
                />
            );

        case 'password':
            return <PasswordField field={field} placeholder={placeholder} disabled={disabled} />;

        case 'select':
            return (
                <Select value={field.value ?? ''} onValueChange={(val) => field.onChange(val === '' ? undefined : val)} disabled={disabled}>
                    <SelectTrigger className={hasError ? 'border-red-400' : ''}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options?.map(opt => (
                            <SelectItem key={opt.value} value={String(opt.value)}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );

        case 'switch':
            return (
                <div className="flex items-center space-x-3">
                    <Switch
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                    />
                    <Label htmlFor={field.name} className="cursor-pointer font-normal">{placeholder}</Label>
                </div>
            );

        case 'date':
            return (
                <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    hasError={hasError}
                />
            );

        default:
            return (
                <Input
                    {...field}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={hasError ? 'border-red-400' : ''}
                />
            );
    }
}

export function FormBuilder<T extends FieldValues>({
    fields,
    defaultValues,
    validation,
    onSubmit,
    onCancel,
    submitText = 'Submit',
    cancelText = 'Cancel',
    className,
    submitClassName,
    loading = false,
    disabled = false,
}: FormConfig<T>) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<T>({
        defaultValues,
        resolver: validation ? (zodResolver(validation) as Resolver<T>) : undefined,
        mode: 'onBlur',
    });

    const shouldShowField = (fieldConfig: FieldConfig<T>) => {
        if (!fieldConfig.conditional) return true;
        const { field: condField, value: condValue, operator = 'equals' } = fieldConfig.conditional;
        const current = watch(condField);
        return operator === 'equals' ? current === condValue : current !== condValue;
    };

    const getError = (name: Path<T>) => {
        const parts = (name as string).split('.');
        let err: any = errors;
        for (const p of parts) { err = err?.[p]; if (!err) break; }
        return typeof err?.message === 'string' ? err.message : undefined;
    };

    return (
        <form onSubmit={handleSubmit(async (data) => {
            await (onSubmit as any)(data);

        })} className={cn('space-y-5', className)}>
            {fields.filter(shouldShowField).map(fieldConfig => (
                <div key={fieldConfig.name as string} className={cn('space-y-1.5', fieldConfig.className)}>
                    {fieldConfig.type !== 'switch' && (
                        <Label
                            htmlFor={fieldConfig.name as string}
                            className={cn(fieldConfig.required && "after:content-['*'] after:text-red-500 after:ml-0.5")}
                        >
                            {fieldConfig.label}
                        </Label>
                    )}
                    {fieldConfig.description && (
                        <p className="text-xs text-gray-500">{fieldConfig.description}</p>
                    )}

                    <Controller
                        name={fieldConfig.name}
                        control={control}
                        render={({ field, fieldState }) => (
                            <>{renderField({ ...fieldConfig }, field, fieldState, watch as any)}</>
                        )}
                    />

                    {getError(fieldConfig.name) && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <X className="h-3 w-3 shrink-0" />
                            {getError(fieldConfig.name)}
                        </p>
                    )}
                </div>
            ))}

            <div className="flex flex-col gap-3 pt-2">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting || loading} className="w-full">
                        {cancelText}
                    </Button>
                )}
                <Button type="submit" disabled={isSubmitting || loading || disabled} className={cn('w-full bg-indigo-600 hover:bg-indigo-700', submitClassName)}>
                    {(isSubmitting || loading) ? (
                        <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />Processing...</>
                    ) : (
                        <>{submitText}</>
                    )}
                </Button>
            </div>
        </form>
    );
}
