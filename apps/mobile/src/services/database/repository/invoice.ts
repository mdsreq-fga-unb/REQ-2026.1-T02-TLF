import { database } from '..'
import { Invoice, InvoicePaymentStatus, InvoiceStatus } from '../models/invoice'

const INVOICES_TABLE = 'invoices'

const invoicesCollection = () => database.get<Invoice>(INVOICES_TABLE)

export type InvoiceInput = {
  accountId: string
  status?: InvoiceStatus
  paymentStatus?: InvoicePaymentStatus
  referenceMonth: number
  referenceYear: number
  totalAmount?: number
  paidAmount?: number
  closingDay: number
  dueDay: number
}

export type InvoiceUpdateInput = Partial<InvoiceInput>

const applyInvoiceFields = (invoice: Invoice, input: InvoiceInput | InvoiceUpdateInput) => {
  if (input.accountId !== undefined) invoice.accountId = input.accountId
  if (input.status !== undefined) invoice.status = input.status
  if (input.paymentStatus !== undefined) invoice.paymentStatus = input.paymentStatus
  if (input.referenceMonth !== undefined) invoice.referenceMonth = input.referenceMonth
  if (input.referenceYear !== undefined) invoice.referenceYear = input.referenceYear
  if (input.totalAmount !== undefined) invoice.totalAmount = input.totalAmount
  if (input.paidAmount !== undefined) invoice.paidAmount = input.paidAmount
  if (input.closingDay !== undefined) invoice.closingDay = input.closingDay
  if (input.dueDay !== undefined) invoice.dueDay = input.dueDay
}

export const getInvoiceById = async (id: string) => invoicesCollection().find(id)

export const createInvoice = async (input: InvoiceInput) => {
  return database.write(async () => {
    return invoicesCollection().create((invoice) => {
      applyInvoiceFields(invoice, {
        status: input.status ?? 'OPEN',
        paymentStatus: input.paymentStatus ?? 'NOT_PAID',
        totalAmount: input.totalAmount ?? 0,
        paidAmount: input.paidAmount ?? 0,
        ...input,
      })
    })
  })
}

export const updateInvoice = async (id: string, input: InvoiceUpdateInput) => {
  return database.write(async () => {
    const invoice = await getInvoiceById(id)
    return invoice.update((record) => {
      applyInvoiceFields(record, input)
    })
  })
}

export const markInvoiceAsDeleted = async (id: string) => {
  return database.write(async () => {
    const invoice = await getInvoiceById(id)
    await invoice.markAsDeleted()
  })
}

export const invoiceQueries = {
  table: INVOICES_TABLE,
  getById: getInvoiceById,
  create: createInvoice,
  update: updateInvoice,
  markAsDeleted: markInvoiceAsDeleted,
  delete: markInvoiceAsDeleted,
}
