import React from 'react';
import { AlertCircle, X, RefreshCw, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/utils';

interface ErrorBannerProps {
  title?: string;
  message?: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  dismissible?: boolean;
  onDismiss?: () => void;
  onRetry?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const typeConfig = {
  error: {
    Icon: AlertCircle,
    wrapper: 'bg-red-50 border border-red-200',
    iconCls: 'text-red-500',
    titleCls: 'text-red-700',
    msgCls: 'text-red-600',
    btnCls: 'border-red-300 text-red-600 hover:bg-red-100',
    dismissCls: 'text-red-400 hover:text-red-600 hover:bg-red-100',
  },
  warning: {
    Icon: AlertTriangle,
    wrapper: 'bg-orange-50 border border-orange-200',
    iconCls: 'text-[#ff6900]',
    titleCls: 'text-orange-700',
    msgCls: 'text-orange-600',
    btnCls: 'border-orange-300 text-[#ff6900] hover:bg-orange-100',
    dismissCls: 'text-orange-400 hover:text-[#ff6900] hover:bg-orange-100',
  },
  info: {
    Icon: Info,
    wrapper: 'bg-blue-50 border border-blue-200',
    iconCls: 'text-blue-500',
    titleCls: 'text-blue-700',
    msgCls: 'text-blue-600',
    btnCls: 'border-blue-300 text-blue-600 hover:bg-blue-100',
    dismissCls: 'text-blue-400 hover:text-blue-600 hover:bg-blue-100',
  },
  success: {
    Icon: CheckCircle,
    wrapper: 'bg-green-50 border border-green-200',
    iconCls: 'text-green-500',
    titleCls: 'text-green-700',
    msgCls: 'text-green-600',
    btnCls: 'border-green-300 text-green-600 hover:bg-green-100',
    dismissCls: 'text-green-400 hover:text-green-600 hover:bg-green-100',
  },
};

export function ErrorBanner({
  title,
  message,
  type = 'error',
  dismissible = true,
  onDismiss,
  onRetry,
  className,
  children,
}: ErrorBannerProps) {
  const config = typeConfig[type];
  const { Icon } = config;

  return (
    <div className={cn('rounded-xl p-4', config.wrapper, className)} role="alert">
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', config.iconCls)} />

        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn('text-sm font-semibold mb-0.5', config.titleCls)}>{title}</p>
          )}
          {message && (
            <p className={cn('text-sm', config.msgCls)}>{message}</p>
          )}
          {children && (
            <div className={cn('text-sm', config.msgCls)}>{children}</div>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className={cn(
                'mt-3 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors',
                config.btnCls
              )}
            >
              <RefreshCw className="h-3 w-3" />
              Try Again
            </button>
          )}
        </div>

        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'shrink-0 h-7 w-7 flex items-center justify-center rounded-lg transition-colors',
              config.dismissCls
            )}
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function NetworkErrorBanner({
  onRetry,
  onDismiss,
}: Pick<ErrorBannerProps, 'onRetry' | 'onDismiss'>) {
  return (
    <ErrorBanner
      type="warning"
      title="Network Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
      onDismiss={onDismiss}
    />
  );
}

export function ValidationErrorBanner({
  errors,
  onDismiss,
}: {
  errors: Record<string, string[]>;
  onDismiss?: () => void;
}) {
  const errorMessages = Object.entries(errors).flatMap(([field, messages]) =>
    messages.map((msg) => `${field}: ${msg}`)
  );

  return (
    <ErrorBanner type="error" title="Validation Error" onDismiss={onDismiss}>
      <ul className="list-disc list-inside space-y-1 mt-1">
        {errorMessages.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </ErrorBanner>
  );
}

export function SuccessBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss?: () => void;
}) {
  return <ErrorBanner type="success" message={message} onDismiss={onDismiss} />;
}
