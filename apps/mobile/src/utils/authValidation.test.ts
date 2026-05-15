import {
  LOGIN_PASSWORD_MIN_LENGTH,
  REGISTER_PASSWORD_RULE_MESSAGE,
  getEmailError,
  getNameError,
  getPasswordConfirmError,
  getPasswordRequiredError,
  getRegisterPasswordError,
  meetsRegisterPasswordRules,
} from './authValidation'

describe('authValidation', () => {
  describe('getEmailError', () => {
    it('returns message for empty email', () => {
      expect(getEmailError('')).toBe('Por favor insira um E-mail')
    })

    it('returns message for invalid format', () => {
      expect(getEmailError('not-an-email')).toBe('E-mail invalido')
    })

    it('returns empty string for valid email', () => {
      expect(getEmailError('user@example.com')).toBe('')
    })
  })

  describe('getPasswordRequiredError (login length vs backend LoginRequestDto)', () => {
    it('returns message when empty', () => {
      expect(getPasswordRequiredError('')).toBe('Por favor insira uma senha')
    })

    it('returns message when shorter than backend min length', () => {
      expect(getPasswordRequiredError('short')).toContain(String(LOGIN_PASSWORD_MIN_LENGTH))
    })

    it('returns empty when length is within backend bounds', () => {
      expect(getPasswordRequiredError('a'.repeat(LOGIN_PASSWORD_MIN_LENGTH))).toBe('')
    })
  })

  describe('getRegisterPasswordError (matches RegisterRequestDto + IsStrongPassword)', () => {
    it('returns message when empty', () => {
      expect(getRegisterPasswordError('')).toBe('Por favor insira uma senha')
    })

    it('returns backend rule message when rules are not met', () => {
      expect(getRegisterPasswordError('short')).toBe(REGISTER_PASSWORD_RULE_MESSAGE)
      expect(getRegisterPasswordError('abcdefgh')).toBe(REGISTER_PASSWORD_RULE_MESSAGE)
      expect(getRegisterPasswordError('abcdefg1')).toBe(REGISTER_PASSWORD_RULE_MESSAGE)
    })

    it('returns empty when password matches backend strong rules', () => {
      expect(getRegisterPasswordError('Password123')).toBe('')
    })
  })

  describe('meetsRegisterPasswordRules', () => {
    it('returns false for invalid samples', () => {
      expect(meetsRegisterPasswordRules('')).toBe(false)
      expect(meetsRegisterPasswordRules('Pass1')).toBe(false)
      expect(meetsRegisterPasswordRules('password13')).toBe(false)
      expect(meetsRegisterPasswordRules('PASSWORD13')).toBe(false)
    })

    it('returns true for valid sample', () => {
      expect(meetsRegisterPasswordRules('Password123')).toBe(true)
    })
  })

  describe('getNameError', () => {
    it('returns message when empty', () => {
      expect(getNameError('')).toBe('Por favor insira um nome')
    })

    it('requires at least two tokens', () => {
      expect(getNameError('Somente')).toBe('Insira pelo menos nome e sobrenome')
    })

    it('rejects non-letter characters', () => {
      expect(getNameError('Nome 123 Sobrenome')).toBe('Insira apenas letras do alfabeto')
    })

    it('returns empty for valid full name', () => {
      expect(getNameError('Maria Silva')).toBe('')
    })
  })

  describe('getPasswordConfirmError', () => {
    it('returns message when mismatch', () => {
      expect(getPasswordConfirmError('a', 'b')).toBe(
        'Essas senhas não coincidiram, Tente novamente.',
      )
    })

    it('returns empty when match', () => {
      expect(getPasswordConfirmError('same', 'same')).toBe('')
    })
  })
})
