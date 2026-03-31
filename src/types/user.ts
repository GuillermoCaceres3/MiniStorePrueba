import type { Role } from "./role"

export type User = {
    id: number
    username: string
    email: string
    password: string
    role: Role
    isActive: boolean
}
