import type { User, AuthTokens, LoginCredentials, RegisterData, ApiResponse } from '@/types';

const otpStore: Record<string, string> = {};

const mockUsers: User[] = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        isAdmin: true,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '2',
        name: 'Regular User',
        email: 'user@example.com',
        isAdmin: false,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];

const mockPasswords: Record<string, string> = {
    'admin@example.com': 'admin123',
    'user@example.com': 'user123',
};

function generateTokens(user: User): AuthTokens {
    const payload = {
        sub: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        iat: Math.floor(Date.now() / 1000),
    };
    const accessToken = `mock.${btoa(JSON.stringify(payload))}.signature`;
    return { accessToken };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
    async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
        await delay(800);
        const user = mockUsers.find(u => u.email === credentials.email);
        const expectedPassword = mockPasswords[credentials.email];
        if (!user || credentials.password !== expectedPassword) {
            throw { response: { status: 401, data: { success: false, message: 'Invalid email or password', data: null } } };
        }
        if (!user.isActive) {
            throw { response: { status: 403, data: { success: false, message: 'Account is deactivated', data: null } } };
        }
        console.log("Login API hit")
        return { success: true, message: 'Login successful', data: { user, tokens: generateTokens(user) } };
    },
    async checkUsername(username: string) {
        await delay(500);

        const exists = mockUsers.some(
            (user) => user.name.toLowerCase() === username.toLowerCase()
        );

        if (exists) {
            throw {
                response: {
                    status: 400,
                    data: {
                        success: false,
                        message: 'Username already taken',
                        data: null
                    }
                }
            };
        }

        return {
            success: true,
            message: 'Username available',
            data: null
        };
    },

    async register(userData: RegisterData): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
        await delay(1000);
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
            throw { response: { status: 400, data: { success: false, message: 'User with this email already exists', data: null } } };
        }
        const newUser: User = {
            id: (mockUsers.length + 1).toString(),
            name: userData.name,
            email: userData.email,
            isAdmin: false,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        console.log(newUser)
        mockUsers.push(newUser);
        mockPasswords[userData.email] = userData.password;
        return { success: true, message: 'Registration successful', data: { user: newUser, tokens: generateTokens(newUser) } };
    },

    async logout(): Promise<ApiResponse<null>> {
        await delay(200);
        return { success: true, message: 'Logged out successfully', data: null };
    },



    async getCurrentUser(token: string): Promise<ApiResponse<User>> {
        await delay(300);
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const user = mockUsers.find(u => u.id === payload.sub);
            if (!user) throw new Error('User not found');
            return { success: true, message: 'User fetched', data: user };
        } catch {
            throw { response: { status: 401, data: { success: false, message: 'Invalid token', data: null } } };
        }
    },

    async sendOtp(target: string): Promise<{ success: boolean; otp: string }> {
        await delay(600);
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        otpStore[target] = otp;
        console.log(`OTP for ${target} → ${otp}`);
        return { success: true, otp };
    },

    async verifyOtp(target: string, otp: string): Promise<{ verified: boolean }> {
        await delay(400);
        const stored = otpStore[target];
        if (stored && stored === otp) {
            delete otpStore[target];
            return { verified: true };
        }
        return { verified: false };
    },
};
