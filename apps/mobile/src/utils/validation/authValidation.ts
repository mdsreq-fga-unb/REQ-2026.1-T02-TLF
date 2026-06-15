export const LOGIN_PASSWORD_MIN_LENGTH = 8
export const LOGIN_PASSWORD_MAX_LENGTH = 100

export const REGISTER_PASSWORD_RULE_MESSAGE =
  'A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FULL_NAME_REGEX = /\S+\s+\S+/
const LETTERS_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/

function hasLoginPasswordLengthInRange(password: string): boolean {
  return (
    password.length >= LOGIN_PASSWORD_MIN_LENGTH && password.length <= LOGIN_PASSWORD_MAX_LENGTH
  )
}

export function meetsRegisterPasswordRules(password: string): boolean {
  if (!hasLoginPasswordLengthInRange(password)) {
    return false
  }
  return /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)
}

export function getEmailError(email: string): string {
  if (email === '') {
    return 'Por favor insira um E-mail'
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'E-mail invalido'
  }
  return ''
}

export function getPasswordRequiredError(password: string): string {
  if (password === '') {
    return 'Por favor insira uma senha'
  }
  if (!hasLoginPasswordLengthInRange(password)) {
    return `A senha deve ter no mínimo ${LOGIN_PASSWORD_MIN_LENGTH} caracteres`
  }
  return ''
}

export function getRegisterPasswordError(password: string): string {
  if (password === '') {
    return 'Por favor insira uma senha'
  }
  if (!meetsRegisterPasswordRules(password)) {
    return REGISTER_PASSWORD_RULE_MESSAGE
  }
  return ''
}

export function getNameError(name: string): string {
  if (name === '') {
    return 'Por favor insira um nome'
  }
  if (!FULL_NAME_REGEX.test(name)) {
    return 'Insira pelo menos nome e sobrenome'
  }
  if (!LETTERS_REGEX.test(name)) {
    return 'Insira apenas letras do alfabeto'
  }
  return ''
}

export function getPasswordConfirmError(password: string, passwordConfirm: string): string {
  if (passwordConfirm !== password) {
    return 'Essas senhas não coincidiram, Tente novamente.'
  }
  return ''
}
