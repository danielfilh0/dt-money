import * as Dialog from '@radix-ui/react-dialog'
import { PencilSimple, Trash } from 'phosphor-react'
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { ConfirmRemoveTransactionModal } from '../../../../components/ConfirmRemoveTransactionModal'
import { EditTransactionModal } from '../../../../components/EditTransactionModal'
import {
  TransactionProps,
  TransactionContext,
} from '../../../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../../../utils/formatter'

import {
  DeleteTransactionButton,
  EditTransactionButton,
  PriceHighlight,
  TransactionContainer,
} from './styles'

export function Transaction({
  id,
  description,
  price,
  type,
  category,
  createdAt,
}: TransactionProps) {
  const { deleteTransaction } = useContextSelector(
    TransactionContext,
    (context) => {
      return {
        transactions: context.transactions,
        deleteTransaction: context.deleteTransaction,
      }
    },
  )

  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const [
    confirmRemoveTransactionModalIsOpen,
    setConfirmRemoveTransactionModalIsOpen,
  ] = useState(false)

  function handleEditTransactionModal(status: boolean) {
    setEditModalIsOpen(status)
  }

  function handleRemoveTransactionModal(status: boolean) {
    setConfirmRemoveTransactionModalIsOpen(status)
  }

  return (
    <TransactionContainer>
      <td width="50%">{description}</td>
      <td>
        <PriceHighlight variant={type}>
          {type === 'outcome' && '- '}
          {priceFormatter.format(price)}
        </PriceHighlight>
      </td>
      <td>{category}</td>
      <td>{dateFormatter.format(new Date(createdAt))}</td>
      <td>
        <Dialog.Root open={editModalIsOpen} onOpenChange={setEditModalIsOpen}>
          <Dialog.Trigger asChild>
            <EditTransactionButton title="Editar transação">
              <PencilSimple size={20} />
            </EditTransactionButton>
          </Dialog.Trigger>

          <EditTransactionModal
            id={id}
            handleModal={handleEditTransactionModal}
          />
        </Dialog.Root>

        <Dialog.Root
          open={confirmRemoveTransactionModalIsOpen}
          onOpenChange={setConfirmRemoveTransactionModalIsOpen}
        >
          <Dialog.Trigger asChild>
            <DeleteTransactionButton
              title="Remover transação"
              onClick={() => setConfirmRemoveTransactionModalIsOpen(true)}
            >
              <Trash size={20} />
            </DeleteTransactionButton>
          </Dialog.Trigger>

          <ConfirmRemoveTransactionModal
            id={id}
            description={description}
            handleModal={handleRemoveTransactionModal}
          />
        </Dialog.Root>
      </td>
    </TransactionContainer>
  )
}
