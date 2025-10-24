// localStorage management with type safety and expiration

interface StorageOptions {
  expiresIn?: number // milliseconds
}

interface StorageItem<T> {
  value: T
  expiresAt?: number
}

class StorageManager {
  private prefix = 'vikaas_'

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  set<T>(key: string, value: T, options?: StorageOptions): void {
    try {
      const item: StorageItem<T> = {
        value,
        expiresAt: options?.expiresIn ? Date.now() + options.expiresIn : undefined
      }

      localStorage.setItem(this.getKey(key), JSON.stringify(item))
    } catch (error) {
      console.warn(`Failed to set storage key "${key}":`, error)
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key))

      if (!item) return defaultValue ?? null

      const parsed: StorageItem<T> = JSON.parse(item)

      // Check if expired
      if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
        this.remove(key)
        return defaultValue ?? null
      }

      return parsed.value
    } catch (error) {
      console.warn(`Failed to get storage key "${key}":`, error)
      return defaultValue ?? null
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.warn(`Failed to remove storage key "${key}":`, error)
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('Failed to clear storage:', error)
    }
  }

  // Get all stored items
  getAll(): Record<string, any> {
    const items: Record<string, any> = {}

    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          const cleanKey = key.replace(this.prefix, '')
          const value = this.get(cleanKey)
          if (value !== null) {
            items[cleanKey] = value
          }
        }
      })
    } catch (error) {
      console.warn('Failed to get all storage items:', error)
    }

    return items
  }
}

export const storage = new StorageManager()

// User preferences storage
export interface UserPreferences {
  theme?: 'light' | 'dark'
  sidebarCollapsed?: boolean
  notificationsEnabled?: boolean
  language?: string
}

export const userPreferences = {
  get: () => storage.get<UserPreferences>('userPreferences', {}),
  set: (prefs: UserPreferences) => storage.set('userPreferences', prefs),
  update: (prefs: Partial<UserPreferences>) => {
    const current = userPreferences.get()
    userPreferences.set({ ...current, ...prefs })
  }
}

// Dashboard state persistence
export interface DashboardState {
  activeRole?: 'student' | 'teacher' | 'parent' | 'admin'
  activeTab?: string
  lastVisited?: number
}

export const dashboardState = {
  get: () => storage.get<DashboardState>('dashboardState', {}),
  set: (state: DashboardState) => storage.set('dashboardState', state),
  update: (state: Partial<DashboardState>) => {
    const current = dashboardState.get()
    dashboardState.set({ ...current, ...state, lastVisited: Date.now() })
  }
}

// Session management
export interface SessionData {
  userId?: string
  sessionStart?: number
  lastActivity?: number
}

export const session = {
  get: () => storage.get<SessionData>('session', {}),
  set: (data: SessionData) => storage.set('session', data),
  update: (data: Partial<SessionData>) => {
    const current = session.get()
    session.set({ ...current, ...data, lastActivity: Date.now() })
  },
  clear: () => storage.remove('session')
}

// Cache management with TTL
export const cache = {
  set: <T>(key: string, value: T, ttlMs: number = 5 * 60 * 1000) => {
    storage.set(`cache_${key}`, value, { expiresIn: ttlMs })
  },
  get: <T>(key: string): T | null => {
    return storage.get<T>(`cache_${key}`)
  },
  clear: (key: string) => {
    storage.remove(`cache_${key}`)
  }
}

