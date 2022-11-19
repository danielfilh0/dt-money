import { PencilSimple, Trash } from 'phosphor-react'
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { SearchForm } from './components/SearchForm'
import { TransactionsContainer, TransactionsTable } from './styles'
import { Transaction } from './components/Transaction'

export function Transactions() {
  const { transactions } = useContextSelector(TransactionContext, (context) => {
    return {
      transactions: context.transactions,
      deleteTransaction: context.deleteTransaction,
    }
  })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <Transaction
                  key={transaction.id}
                  id={transaction.id}
                  description={transaction.description}
                  price={transaction.price}
                  type={transaction.type}
                  category={transaction.category}
                  createdAt={transaction.createdAt}
                />
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
