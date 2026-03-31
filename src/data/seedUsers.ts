import type { User } from "../types/user";

export const seedUsers: User[] = [
    {
        id: 1,
        username: 'Admin',
        email: import.meta.env.VITE_ADMIN_EMAIL,
        password: import.meta.env.VITE_ADMIN_PASSWORD,
        role: 'admin',
        isActive: true,
    }
]
