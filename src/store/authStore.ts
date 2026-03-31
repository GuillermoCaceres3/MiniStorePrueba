import { create } from 'zustand'
import { seedUsers } from '../data/seedUsers'
import type { User } from '../types/user'

type RegisterData = {
  username: string
  email: string
  password: string
}

type LoginData = {
  email: string
  password: string
}

type AuthStore = {
  users: User[]
  currentUser: User | null
  register: (data: RegisterData) => { success: boolean; message: string }
  login: (data: LoginData) => { success: boolean; message: string }
  logout: () => void
  deleteUser: (userId: number) => void
  toggleUserStatus: (userId: number) => void
}

const getStoredUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users')

  if (storedUsers) {
    return JSON.parse(storedUsers)
  }

  localStorage.setItem('users', JSON.stringify(seedUsers))
  return seedUsers
}

const getStoredCurrentUser = (): User | null => {
  const storedCurrentUser = localStorage.getItem('currentUser')
  return storedCurrentUser ? JSON.parse(storedCurrentUser) : null
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  users: getStoredUsers(),
  currentUser: getStoredCurrentUser(),

  register: ({ username, email, password }) => {
    const users = get().users

    const emailAlreadyExists = users.some((user) => user.email === email)

    if (emailAlreadyExists) {
      return {
        success: false,
        message: 'This email is already registered.',
      }
    }

    const newUser: User = {
      id: Date.now(),
      username,
      email,
      password,
      role: 'user',
      isActive: true,
    }

    const updatedUsers = [...users, newUser]

    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.setItem('currentUser', JSON.stringify(newUser))

    set({
      users: updatedUsers,
      currentUser: newUser,
    })

    return {
      success: true,
      message: 'User registered successfully.',
    }
  },

  login: ({ email, password }) => {
    const users = get().users

    const user = users.find(
      (user) => user.email === email && user.password === password,
    )

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password.',
      }
    }

    if (!user.isActive) {
      return {
        success: false,
        message: 'This user has been deactivated.',
      }
    }

    localStorage.setItem('currentUser', JSON.stringify(user))

    set({
      currentUser: user,
    })

    return {
      success: true,
      message: 'Login successful.',
    }
  },

  logout: () => {
    localStorage.removeItem('currentUser')

    set({
      currentUser: null,
    })
  },

  deleteUser: (userId) => {
  const updatedUsers = get().users.filter((user) => user.id !== userId)

  localStorage.setItem('users', JSON.stringify(updatedUsers))

  set({
    users: updatedUsers,
  })
},

toggleUserStatus: (userId) => {
  const updatedUsers = get().users.map((user) =>
    user.id === userId
      ? { ...user, isActive: !user.isActive }
      : user,
  )

  localStorage.setItem('users', JSON.stringify(updatedUsers))

  const currentUser = get().currentUser
  const updatedCurrentUser = currentUser
    ? updatedUsers.find((user) => user.id === currentUser.id) ?? null
    : null

  if (updatedCurrentUser) {
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser))
  } else {
    localStorage.removeItem('currentUser')
  }

  set({
    users: updatedUsers,
    currentUser: updatedCurrentUser,
  })
},
}))