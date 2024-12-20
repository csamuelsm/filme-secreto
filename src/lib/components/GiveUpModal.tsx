import React, { Dispatch, SetStateAction } from 'react'
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa';
import { setLastPlayed, increaseNumberOfGames, resetStreak, addGamePlayed } from '../utils/cookies';
import { track } from '@vercel/analytics';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setFinishOpen: Dispatch<SetStateAction<boolean>>,
    setCanGiveUp: Dispatch<SetStateAction<boolean>>,
    gameNumber: number,
    isOld: boolean
}

function GiveUpModal(props:ModalProps) {

  function giveUp() {
    track('Give up');
    if (!props.isOld) {
        let today = new Date();
        setLastPlayed(today);
    }
    increaseNumberOfGames();
    resetStreak();
    addGamePlayed(props.gameNumber);
    props.setCanGiveUp(false);
    props.setOpen(false);
    props.setFinishOpen(true);
  }

  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Desistir?
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    Tem certeza? Você tá quase lá!
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancelar
                </Button>
                <Button colorScheme='red' variant='outline' rightIcon={<FaSignOutAlt />}
                    onClick={() => giveUp()}>
                    Desistir
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default GiveUpModal;