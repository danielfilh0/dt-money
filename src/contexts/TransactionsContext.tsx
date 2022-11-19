import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

export interface TransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: TransactionProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: TransactionInput) => Promise<void>
  editTransaction: (id: number, data: TransactionInput) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(async (data: TransactionInput) => {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }, [])

  async function editTransaction(id: number, data: TransactionInput) {
    const { description, price, category, type } = data

    const response = await api.put('transactions/' + id, {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    const newTransactions = transactions.map((transaction) => {
      if (transaction.id === id) return response.data
      else return transaction
    })

    setTransactions(newTransactions)
  }

  async function deleteTransaction(id: number) {
    const newTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    )

    await api.delete('transactions/' + id)

    setTransactions(newTransactions)
  }

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
