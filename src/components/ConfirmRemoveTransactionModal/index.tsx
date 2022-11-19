import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../../contexts/TransactionsContext'
import {
  CloseButton,
  Content,
  Overlay,
  RemoveTransactionButton,
  Title,
} from './styles'

interface ConfirmRemoveTransactionModalProps {
  id: number
  description: string
  handleModal: (status: boolean) => void
}

export function ConfirmRemoveTransactionModal({
  id,
  description,
  handleModal,
}: ConfirmRemoveTransactionModalProps) {
  const { deleteTransaction } = useContextSelector(
    TransactionContext,
    (context) => {
      return {
        transactions: context.transactions,
        deleteTransaction: context.deleteTransaction,
      }
    },
  )

  const [deletingTransaction, setDeletingTransaction] = useState<boolean>(false)

  async function handleDeleteTransaction() {
    setDeletingTransaction(true)

    await deleteTransaction(id)

    setDeletingTransaction(false)

    handleModal(false)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>Remover transação</Title>

        <CloseButton>
          <X />
        </CloseButton>

        <Dialog.Description>
          Tem certeza que deseja remover a transação {description}?
        </Dialog.Description>

        <RemoveTransactionButton
          disabled={deletingTransaction}
          onClick={handleDeleteTransaction}
        >
          Remover
        </RemoveTransactionButton>
      </Content>
    </Dialog.Portal>
  )
}
