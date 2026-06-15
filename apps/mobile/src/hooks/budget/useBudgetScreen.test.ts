import { renderHook, act } from '@testing-library/react-native'
import { BudgetService } from '@/services/api/budget'
import { useBudgetScreen } from './useBudgetScreen'

jest.mock('@/services/api/budget')

const mockedBudgetService = jest.mocked(BudgetService)

describe('useBudgetScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useBudgetScreen())

      expect(result.current.name).toBe('')
      expect(result.current.type).toBe('BUDGET')
      expect(result.current.amountLimit).toBe(0)
      expect(result.current.categoryId).toBe('')
      expect(result.current.submitting).toBe(false)
      expect(result.current.showKeypad).toBe(false)
      expect(result.current.showCategoryPicker).toBe(false)
      expect(result.current.submitAttempted).toBe(false)
      expect(result.current.budgets).toEqual([])
      expect(result.current.refreshing).toBe(false)
      expect(result.current.feedbackMessage).toBeNull()
    })

    it('should initialize with provided initial values', () => {
      const initialValues = {
        name: 'Groceries',
        type: 'BUDGET' as const,
        amountLimit: 50000,
        categoryId: 'cat-1',
        month: 4,
        year: 2026,
      }

      const { result } = renderHook(() => useBudgetScreen(initialValues))

      expect(result.current.name).toBe('Groceries')
      expect(result.current.type).toBe('BUDGET')
      expect(result.current.amountLimit).toBe(50000)
      expect(result.current.categoryId).toBe('cat-1')
      expect(result.current.month).toBe(4)
      expect(result.current.year).toBe(2026)
    })
  })

  describe('validation', () => {
    it('should be invalid when amount is 0', () => {
      const { result } = renderHook(() => useBudgetScreen())

      expect(result.current.errors.amount).toBe('Informe o valor da transação')
      expect(result.current.isValid).toBe(false)
    })

    it('should be valid when amount is greater than 0', () => {
      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.handleKeypad('5')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
      })

      expect(result.current.errors.amount).toBeUndefined()
      expect(result.current.isValid).toBe(true)
    })
  })

  describe('keypad handling', () => {
    it('should add digits to amount limit', () => {
      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.handleKeypad('1')
        result.current.handleKeypad('2')
        result.current.handleKeypad('3')
      })

      expect(result.current.amountLimit).toBe(123)
    })

    it('should delete last digit when pressing del', () => {
      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.handleKeypad('1')
        result.current.handleKeypad('2')
        result.current.handleKeypad('3')
        result.current.handleKeypad('del')
      })

      expect(result.current.amountLimit).toBe(12)
    })

    it('should not exceed MAX_CENTS', () => {
      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        // Try to input a value that exceeds MAX_CENTS (9_999_999)
        for (let i = 0; i < 20; i++) {
          result.current.handleKeypad('9')
        }
      })

      expect(result.current.amountLimit).toBeLessThanOrEqual(9_999_999)
    })

    it('should ignore non-numeric keys', () => {
      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.handleKeypad('1')
        result.current.handleKeypad('a')
        result.current.handleKeypad('2')
      })

      expect(result.current.amountLimit).toBe(12)
    })
  })

  describe('type change', () => {
    it('should change budget type', () => {
      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.handleTypeChange('LIMIT')
      })

      expect(result.current.type).toBe('LIMIT')
    })

    it('should clear categoryId when type changes', () => {
      const { result } = renderHook(() => useBudgetScreen({ categoryId: 'cat-1' }))

      act(() => {
        result.current.handleTypeChange('LIMIT')
      })

      expect(result.current.categoryId).toBe('')
    })
  })

  describe('create submit', () => {
    it('should not submit when form is invalid', async () => {
      const { result } = renderHook(() => useBudgetScreen())

      await act(async () => {
        await result.current.handleCreateSubmit()
      })

      expect(mockedBudgetService.create).not.toHaveBeenCalled()
      expect(result.current.submitAttempted).toBe(true)
    })

    it('should create budget successfully', async () => {
      mockedBudgetService.create.mockResolvedValue({ data: { id: 'budget-1' } })

      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.setName('Monthly Budget')
        result.current.handleKeypad('1')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
      })

      const onSuccess = jest.fn()

      await act(async () => {
        await result.current.handleCreateSubmit(onSuccess)
      })

      expect(mockedBudgetService.create).toHaveBeenCalledWith({
        name: 'Monthly Budget',
        amountLimit: 10000,
        month: expect.any(Number),
        year: expect.any(Number),
      })
      expect(onSuccess).toHaveBeenCalled()
      expect(result.current.name).toBe('orçamento')
      expect(result.current.amountLimit).toBe(0)
    })

    it('should handle create error', async () => {
      const errorMessage = 'Budget name already exists'
      mockedBudgetService.create.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.setName('Budget')
        result.current.handleKeypad('1')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
      })

      await act(async () => {
        await result.current.handleCreateSubmit()
      })

      expect(result.current.feedbackMessage).toBe(errorMessage)
    })

    it('should handle axios error response', async () => {
      const axiosError = {
        response: {
          data: {
            message: 'Budget name is required',
          },
        },
      }
      mockedBudgetService.create.mockRejectedValue(axiosError)

      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.setName('Budget')
        result.current.handleKeypad('1')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
      })

      await act(async () => {
        await result.current.handleCreateSubmit()
      })

      expect(result.current.feedbackMessage).toBe('Budget name is required')
    })
  })

  describe('edit submit', () => {
    it('should not submit when form is invalid', async () => {
      const { result } = renderHook(() => useBudgetScreen())

      await act(async () => {
        await result.current.handleEditSubmit('budget-1')
      })

      expect(mockedBudgetService.update).not.toHaveBeenCalled()
      expect(result.current.submitAttempted).toBe(true)
    })

    it('should edit budget successfully', async () => {
      mockedBudgetService.update.mockResolvedValue({ data: { id: 'budget-1' } })

      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.setName('Updated Budget')
        result.current.handleKeypad('2')
        result.current.handleKeypad('5')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
      })

      const onSuccess = jest.fn()

      await act(async () => {
        await result.current.handleEditSubmit('budget-1', onSuccess)
      })

      expect(mockedBudgetService.update).toHaveBeenCalledWith('budget-1', {
        name: 'Updated Budget',
        amountLimit: 25000,
        month: expect.any(Number),
        year: expect.any(Number),
      })
      expect(onSuccess).toHaveBeenCalled()
    })

    it('should handle edit error', async () => {
      const errorMessage = 'Budget not found'
      mockedBudgetService.update.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.setName('Budget')
        result.current.handleKeypad('1')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
      })

      await act(async () => {
        await result.current.handleEditSubmit('budget-1')
      })

      expect(result.current.feedbackMessage).toBe(errorMessage)
    })
  })

  describe('fetch budgets', () => {
    it('should fetch all budgets successfully', async () => {
      const mockBudgets = [
        { id: '1', name: 'Budget 1', amountLimit: 10000 },
        { id: '2', name: 'Budget 2', amountLimit: 20000 },
      ]

      mockedBudgetService.getAll.mockResolvedValue({ data: mockBudgets })

      const { result } = renderHook(() => useBudgetScreen())

      await act(async () => {
        await result.current.fetchBudgets()
      })

      expect(mockedBudgetService.getAll).toHaveBeenCalled()
      expect(result.current.budgets).toEqual(mockBudgets)
    })

    it('should handle fetch error', async () => {
      const errorMessage = 'Failed to fetch budgets'
      mockedBudgetService.getAll.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useBudgetScreen())

      await act(async () => {
        await result.current.fetchBudgets()
      })

      expect(result.current.feedbackMessage).toBe(errorMessage)
    })
  })

  describe('fetch single budget', () => {
    it('should fetch and set budget data', async () => {
      mockedBudgetService.getById.mockResolvedValue({
        data: {
          id: 'budget-1',
          name: 'My Budget',
          amountLimit: 50000,
          month: 5,
          year: 2026,
          categoryId: 'cat-1',
        },
      })

      const { result } = renderHook(() => useBudgetScreen())

      await act(async () => {
        await result.current.fetchBudget('budget-1')
      })

      expect(result.current.name).toBe('My Budget')
      expect(result.current.amountLimit).toBe(50000)
      expect(result.current.month).toBe(4) // month - 1
      expect(result.current.year).toBe(2026)
      expect(result.current.categoryId).toBe('cat-1')
    })
  })

  describe('refresh', () => {
    it('should refresh budgets', async () => {
      const mockBudgets = [{ id: '1', name: 'Budget 1', amountLimit: 10000 }]
      mockedBudgetService.getAll.mockResolvedValue({ data: mockBudgets })

      const { result } = renderHook(() => useBudgetScreen())

      await act(async () => {
        await result.current.onRefresh()
      })

      expect(result.current.budgets).toEqual(mockBudgets)
      expect(result.current.refreshing).toBe(false)
    })

    it('should set refreshing flag to false after refresh completes', async () => {
      mockedBudgetService.getAll.mockResolvedValue({ data: [] })

      const { result } = renderHook(() => useBudgetScreen())

      expect(result.current.refreshing).toBe(false)

      await act(async () => {
        await result.current.onRefresh()
      })

      expect(result.current.refreshing).toBe(false)
    })
  })

  describe('reset', () => {
    it('should reset form after successful create submit', async () => {
      mockedBudgetService.create.mockResolvedValue({ data: { id: 'budget-1' } })

      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.setName('Test Budget')
        result.current.handleKeypad('1')
        result.current.handleKeypad('0')
        result.current.handleKeypad('0')
        result.current.setFeedbackMessage('Error message')
      })

      await act(async () => {
        await result.current.handleCreateSubmit()
      })

      expect(result.current.name).toBe('orçamento')
      expect(result.current.amountLimit).toBe(0)
      expect(result.current.categoryId).toBe('')
      expect(result.current.submitAttempted).toBe(false)
      expect(result.current.feedbackMessage).toBeNull()
    })
  })

  describe('feedback message', () => {
    it('should dismiss feedback message', () => {
      const { result } = renderHook(() => useBudgetScreen())

      act(() => {
        result.current.setFeedbackMessage('Test message')
      })

      expect(result.current.feedbackMessage).toBe('Test message')

      act(() => {
        result.current.dismissFeedback()
      })

      expect(result.current.feedbackMessage).toBeNull()
    })
  })

  describe('ui state', () => {
    it('should toggle keypad visibility', () => {
      const { result } = renderHook(() => useBudgetScreen())

      expect(result.current.showKeypad).toBe(false)

      act(() => {
        result.current.setShowKeypad(true)
      })

      expect(result.current.showKeypad).toBe(true)
    })

    it('should toggle category picker visibility', () => {
      const { result } = renderHook(() => useBudgetScreen())

      expect(result.current.showCategoryPicker).toBe(false)

      act(() => {
        result.current.setShowCategoryPicker(true)
      })

      expect(result.current.showCategoryPicker).toBe(true)
    })
  })
})
