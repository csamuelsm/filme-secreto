import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link, List, ListItem, ListIcon, Divider } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaPaypal } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';
import { MdCheckCircle } from 'react-icons/md';
import { SiMercadopago } from 'react-icons/si';

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
                O Filme Secreto pode sair do ar!
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text fontSize='sm' marginBottom={2}>
                    Olá, caros usuários do Filme Secreto! 
                </Text>
                <Text fontSize='sm' marginBottom={2}>
                    Gostaria de informá-los que, infelizmente, <b>o Filme Secreto pode sair de cartaz em breve.</b> 😢
                </Text>
                <Text fontSize='sm' marginBottom={2}>
                    Nos últimos dois anos, o jogo tem sido mantido com muito carinho, mas o domínio <u>filme-secreto.com.br</u> <b>vence no dia 13/11</b>, e infelizmente ainda não temos recursos para renová-lo 💔
                </Text>
                <Text fontSize='sm' marginBottom={2}>
                    💸 Como já falei antes por aqui, <b>não é possível monetizar o Filme Secreto</b> devido a utilização de nomes e dados de filmes de uma base de dados terceirizada. Portanto, eu só posso receber algo através de doações.
                </Text>
                <Text fontSize='sm' marginBottom={2}>
                    Se você se diverte tentando adivinhar filmes por aqui e quer que o jogo continue vivo, <b>considere fazer uma doação através de uma das opções abaixo para ajudar a manter o projeto no ar.</b> 🙏
                </Text>
                <Text fontSize='sm'>
                    Obrigado! Espero que possamos manter o Filme Secreto vivo! 👋🤗
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
                    <Link href='https://link.mercadopago.com.br/filmesecreto' isExternal>
                        <Button w='100%' leftIcon={<SiMercadopago/>} variant='outline' colorScheme='whatsapp'>
                            MercadoPago
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