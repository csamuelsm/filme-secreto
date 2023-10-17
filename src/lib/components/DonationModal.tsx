import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaGithubAlt, FaCoffee } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';

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
                Fazer uma doação
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    Você pode doar qualquer valor para apoiar este jogo. Escolha a melhor opção para você:
                </Text>
                <Flex flexDirection="column" gap={2} marginY={3}>
                    <Button w='100%' leftIcon={<FaPix/>} variant='outline' colorScheme='green'
                    onClick={() => {
                        props.pixModal(true);
                    }}>
                        Pix
                    </Button>
                    <Link href='https://github.com/sponsors/csamuelsm' isExternal>
                        <Button w='100%' leftIcon={<FaGithubAlt/>} variant='outline' colorScheme='blue'>
                            Github Sponsors
                        </Button>
                    </Link>
                    <Link href='https://www.buymeacoffee.com/csamuelssm' isExternal>
                        <Button w='100%' leftIcon={<FaCoffee/>} variant='outline' colorScheme='orange'>
                            Buy me a Coffee
                        </Button>
                    </Link>
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