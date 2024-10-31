import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link, List, ListItem, ListIcon, Divider } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaPaypal } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';
import { MdCheckCircle } from 'react-icons/md';
import { SiPicpay } from 'react-icons/si';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    pixModal: Dispatch<SetStateAction<boolean>>,
}

function UpdatesModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='md' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Atualizações do Filme Secreto
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text fontSize='sm' marginBottom={2}>
                    Olá, caros usuários do Filme Secreto! Gostaria de informá-los sobre algumas correções e atualizações no Filme Secreto.
                </Text>
                <List fontSize='sm' spacing={2}>
                    <ListItem><ListIcon as={MdCheckCircle} color='green.500' /><b>31/10/2024</b>: Todos os jogos antigos que não estavam funcionando agora estão disponíveis! 🥳</ListItem>
                    <ListItem><ListIcon as={MdCheckCircle} color='green.500' /><b>31/10/2024</b>: Novos filmes foram adicionados. Então aproveitem e divirtam-se com os novos filmes e os jogos antigos! <b>Ah, e compartilhem com seus amigos!📣😎👌🔥</b></ListItem>
                </List>
                <Divider marginY={2}/>
                <Text fontSize='sm' marginBottom={2} marginTop={2}>
                    Um outro comunicado que gostaria de dar é o seguinte: <Text as='mark'><b><u>não é possível monetizar o Filme Secreto</u></b></Text>. 
                    E, apesar do jogo estar recebendo uma grande quantidade de acessos, eu continuo trabalhando nele sem ganhar um centavo.
                    Então, considere apoiar o jogo utilizando uma das opções abaixo.
                </Text>
                <Text fontSize='sm'>
                    Bom jogo e feliz halloween! 🎃👻🍬🦇💀🧡
                </Text>
            </ModalBody>
            <ModalFooter>
                {/*<Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancel
                </Button>*/}

                <Flex flexDirection="row" gap={2} marginY={3}>
                    <Button w='100%' leftIcon={<FaPix/>} variant='solid' colorScheme='teal'
                    onClick={() => {
                        props.pixModal(true);
                    }}>
                        Pix
                    </Button>
                    <Link href='https://picpay.me/csamuelssm' isExternal>
                        <Button w='100%' leftIcon={<SiPicpay/>} variant='outline' colorScheme='whatsapp'>
                            PicPay
                        </Button>
                    </Link>
                    <Link href='https://www.paypal.com/donate/?hosted_button_id=DE9ZRCNT78QW4' isExternal>
                        <Button w='100%' leftIcon={<FaPaypal/>} variant='outline' colorScheme='blue'>
                            PayPal
                        </Button>
                    </Link>
                </Flex>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default UpdatesModal