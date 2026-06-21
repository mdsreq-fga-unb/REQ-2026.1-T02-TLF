import { renderHook } from '@testing-library/react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useEditRecordScreen } from './useEditRecordScreen'
import { TRANSACTION_FORM_COPY } from '@/utils/transactionForm'

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}))

const mockedBack = jest.mocked(router.back)
const mockedUseLocalSearchParams = jest.mocked(useLocalSearchParams)

describe('useEditRecordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedUseLocalSearchParams.mockReturnValue({
      id: 'tx-1',
      type: 'EXPENSE',
      amount: '150.5',
      categoryId: 'food',
      institutionId: 'inst-1',
      destinationInstitutionId: 'inst-2',
      description: 'Almoco',
    })
  })

  it('maps route params into initial form values', () => {
    const { result } = renderHook(() => useEditRecordScreen())

    expect(result.current.mode).toBe('edit')
    expect(result.current.title).toBe(TRANSACTION_FORM_COPY.editTitle)
    expect(result.current.initialValues).toEqual({
      type: 'EXPENSE',
      amountCents: 15050,
      categoryId: 'food',
      institutionId: 'inst-1',
      destinationInstitutionId: 'inst-2',
      notes: 'Almoco',
    })
  })

  it('defaults invalid type to EXPENSE', () => {
    mockedUseLocalSearchParams.mockReturnValue({ type: 'INVALID' })
    const { result } = renderHook(() => useEditRecordScreen())

    expect(result.current.initialValues.type).toBe('EXPENSE')
  })

  it('navigates back from header and success handlers', () => {
    const { result } = renderHook(() => useEditRecordScreen())

    result.current.handleBack()
    result.current.handleSuccess()

    expect(mockedBack).toHaveBeenCalledTimes(2)
  })
})
