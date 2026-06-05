import { renderHook, waitFor } from '@testing-library/react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useEditRecordScreen } from './useEditRecordScreen'
import { getTransactionById } from '@/services/database/queries/transaction'
import { TRANSACTION_FORM_COPY } from '@/utils/transactionForm'

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}))

jest.mock('@/services/database/queries/transaction', () => ({
  getTransactionById: jest.fn(),
}))

const mockedBack = jest.mocked(router.back)
const mockedUseLocalSearchParams = jest.mocked(useLocalSearchParams)
const mockedGetTransactionById = jest.mocked(getTransactionById)

const sampleTx = {
  id: 'tx-1',
  type: 'EXPENSE',
  amount: 150.5,
  accountId: 'acc-1',
  destinationAccountId: null,
  categoryId: null,
  subcategoryId: null,
  description: 'Almoco',
  date: new Date('2026-06-01T12:00:00Z'),
  status: 'CONFIRMED',
}

describe('useEditRecordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedUseLocalSearchParams.mockReturnValue({ id: 'tx-1' })
    mockedGetTransactionById.mockResolvedValue(sampleTx as never)
  })

  it('loads the transaction by id into initial form values', async () => {
    const { result } = renderHook(() => useEditRecordScreen())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(mockedGetTransactionById).toHaveBeenCalledWith('tx-1')
    expect(result.current.mode).toBe('edit')
    expect(result.current.title).toBe(TRANSACTION_FORM_COPY.editTitle)
    expect(result.current.initialValues).toEqual({
      id: 'tx-1',
      type: 'EXPENSE',
      amountCents: 15050,
      accountId: 'acc-1',
      destinationAccountId: undefined,
      categoryId: undefined,
      subcategoryId: undefined,
      notes: 'Almoco',
      date: sampleTx.date,
      status: 'CONFIRMED',
    })
  })

  it('flags notFound when the record cannot be loaded', async () => {
    mockedGetTransactionById.mockRejectedValue(new Error('not found'))
    const { result } = renderHook(() => useEditRecordScreen())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.notFound).toBe(true)
    expect(result.current.initialValues).toBeNull()
  })

  it('flags notFound when no id is provided', async () => {
    mockedUseLocalSearchParams.mockReturnValue({})
    const { result } = renderHook(() => useEditRecordScreen())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.notFound).toBe(true)
    expect(mockedGetTransactionById).not.toHaveBeenCalled()
  })

  it('navigates back from header and success handlers', async () => {
    const { result } = renderHook(() => useEditRecordScreen())
    await waitFor(() => expect(result.current.loading).toBe(false))

    result.current.handleBack()
    result.current.handleSuccess()

    expect(mockedBack).toHaveBeenCalledTimes(2)
  })
})
