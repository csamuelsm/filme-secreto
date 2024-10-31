import React, { Dispatch, SetStateAction } from 'react'
import { Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link } from '@chakra-ui/react'
//import QRCodePix from '../../../public/qr-code-pix.png';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

function PixModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Fazer um pix
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    Você pode scanear este QR Code e fazer um pix para Cicero Samuel Santos Morais.
                </Text>
                <Flex w='100%' textAlign='center' alignItems='center' flexDirection='column'>
                    <Image src='https://ibb.co/tJMfstJ' alt='qr-code pix' marginY={3} />
                </Flex>
                <Text>
                    Ou, se preferir, pode usar a chave: <b>9860c0ad-1cfe-4b59-9d76-1a43a4e3461e</b>
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancelar
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default PixModal