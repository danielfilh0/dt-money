import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  function handleModal(status: boolean) {
    setIsOpenModal(status)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal handleModal={handleModal} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
