import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log the error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call the onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to monitoring service in production
    if (import.meta.env.PROD) {
      this.logErrorToService(error, errorInfo);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to your error monitoring service
    // such as Sentry, LogRocket, Bugsnag, etc.
    console.error('Production error logged:', {
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff7ed] p-4">
          <Card className="w-full max-w-lg border border-orange-100 shadow-lg rounded-2xl overflow-hidden">

            {/* top accent bar */}
            <div className="h-1.5 w-full bg-[#ff6900]" />

            <CardHeader className="pt-8 pb-4 flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200">
                <AlertTriangle className="h-8 w-8 text-[#ff6900]" />
              </div>
              <div className="text-center">
                <CardTitle className="text-xl text-gray-800">Something went wrong</CardTitle>
                <CardDescription className="text-sm text-gray-400 mt-1">
                  An unexpected error occurred. Please try one of the options below.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-4">
              {import.meta.env.DEV && this.state.error && (
                <details className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                  <summary className="cursor-pointer text-xs font-medium text-[#ff6900] flex items-center gap-1.5">
                    <Bug className="h-3.5 w-3.5" />
                    Error Details (Dev Only)
                  </summary>
                  <div className="mt-3 space-y-2 text-xs font-mono text-gray-600">
                    <p><span className="font-semibold text-gray-700">Error:</span> {this.state.error.toString()}</p>
                    {this.state.error.stack && (
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Stack:</p>
                        <pre className="whitespace-pre-wrap bg-white rounded-lg p-2 border border-orange-100 text-[11px] max-h-36 overflow-auto">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Component Stack:</p>
                        <pre className="whitespace-pre-wrap bg-white rounded-lg p-2 border border-orange-100 text-[11px] max-h-36 overflow-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </CardContent>

            <CardFooter className="px-6 pb-6 flex flex-col gap-2">
              <Button
                onClick={this.handleRetry}
                className="w-full bg-[#ff6900] hover:bg-orange-600 text-white rounded-xl h-10"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex-1 rounded-xl h-10 border-orange-200 text-gray-600 hover:bg-orange-50 hover:text-[#ff6900]"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleReload}
                  className="flex-1 rounded-xl h-10 border-orange-200 text-gray-600 hover:bg-orange-50 hover:text-[#ff6900]"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}