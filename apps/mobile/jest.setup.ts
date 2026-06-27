import { Alert } from 'react-native'

process.env.EXPO_PUBLIC_API_URL ??= 'http://localhost:3000/api/v1'

jest.mock('@nozbe/watermelondb/adapters/sqlite', () => ({
  __esModule: true,
  default: jest.fn((config) => ({
    schema: config?.schema ?? { tables: [] },
    migrations: config?.migrations,
  })),
}))

jest.mock('@nozbe/watermelondb/sync', () => ({
  synchronize: jest.fn(),
}))

jest.spyOn(Alert, 'alert').mockImplementation(() => {})
