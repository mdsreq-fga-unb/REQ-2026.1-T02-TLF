import { Alert } from 'react-native'

jest.spyOn(Alert, 'alert').mockImplementation(() => {})
