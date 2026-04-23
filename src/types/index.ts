export interface User {
    id: string;
    email: string;
    name: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
    isAdmin: boolean;
    phone?: string;
    address?: string;
    avatar?: string;
    credits?: number;
    createdAt?: string;
    updatedAt?: string;
    isActive?: boolean;
}

export const UserRole = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface AuthTokens {
    accessToken: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    phone?: string;
    address?: string;
    isAdmin?: boolean;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    status: 'active' | 'draft' | 'out_of_stock';
    images?: string[];
    createdAt: string;
    updatedAt: string;
}
export type FAQItem = {
    id: string;
    question: string;
    answer: string;
    category: "orders" | "payment" | "shipping" | "account" | "returns" | "general";
};

export interface ApiResponse<T = unknown> {
    data: T;
    message: string;
    success: boolean;
    errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface Theme {
    id: string;
    name: string;
    colors: {
        background: string;
        foreground: string;
        primary: string;
        secondary: string;
        accent: string;
        muted: string;
        border: string;
        destructive: string;
    };
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface FeatureFlags {
    betaFeatures: boolean;
    advancedAnalytics: boolean;
    experimentalUI: boolean;
}

export type Language = 'en' | 'es';

export interface TableColumn<T> {
    id: string;
    header: string;
    accessorKey?: keyof T;
    cell?: (row: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
}

export interface FormStep {
    id: string;
    title: string;
    description?: string;
    component: React.ComponentType<any>;
    validation?: any;
}
