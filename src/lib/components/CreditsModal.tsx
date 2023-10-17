import React, { Dispatch, SetStateAction } from 'react'
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link } from '@chakra-ui/react'

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

function CreditsModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Créditos
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text marginY={3}>
                    Este jogo foi criado por {' '}
                    <Link href='https://meu-blog-csamuelsm.vercel.app/' >
                        Samuel Santos
                    </Link> inspirado pelo {' '}
                    <Link href='https://contexto.me/'>
                        Contexto.me
                    </Link>
                    .
                </Text>
                <Text marginY={3}>
                    A base da interface usa a Chakra UI com o template de {' '}
                    <Link href='https://nextarter-chakra.sznm.dev/'>
                        sznm
                    </Link>.
                </Text>
                <Text marginY={3}>
                    Os dados utilizados neste jogo são do conjunto de dados públicos do MovieLens.
                </Text>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default CreditsModal