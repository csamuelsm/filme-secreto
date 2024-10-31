import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaGithubAlt, FaCoffee, FaPaypal } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';
import { SiPicpay } from 'react-icons/si';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    pixModal: Dispatch<SetStateAction<boolean>>,
}

function DonationModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Apoiar o jogo
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    Você pode doar <b>qualquer valor para apoiar este jogo</b>. Escolha a melhor opção para você:
                </Text>
                <Flex flexDirection="column" gap={2} marginY={3}>
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
                    {/*<Link href='https://github.com/sponsors/csamuelsm' isExternal>
                        <Button w='100%' leftIcon={<FaGithubAlt/>} variant='outline' colorScheme='gray'>
                            Github Sponsors
                        </Button>
                    </Link>
                    <Link href='https://www.buymeacoffee.com/csamuelssm' isExternal>
                        <Button w='100%' leftIcon={<FaCoffee/>} variant='outline' colorScheme='orange'>
                            Buy me a Coffee
                        </Button>
                    </Link>*/}
                </Flex>
            </ModalBody>
            {/*<ModalFooter>
                <Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancel
                </Button>
            </ModalFooter>*/}
        </ModalContent>
    </Modal>
  )
}

export default DonationModal