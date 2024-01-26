import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Grid, GridItem, Link } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa';
import { setLastPlayed, increaseNumberOfGames, resetStreak } from '../utils/cookies';
import { startDate } from '../utils/const';
import { MdMovieFilter } from 'react-icons/md';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

function OldGamesModal(props:ModalProps) {

  const [number, setNumber] = useState<number>(0);
  //const [games, setGames] = useState<string[]>([]);
  let today = new Date();
  let currGameDate = new Date();

  useEffect(() => {
    async function getOldGames() {
        //let res = await fetch('/api/get_old_games');
        //let json = await res.json();

        const today = new Date();
        let diffMs = today.getTime() - startDate.getTime();
        let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        setNumber(diffDays);

        /*if (json.games) {
            //setGames(json.games);
            setNumber(json.number);
        } else {
            throw Error('Couldn\'t get the old games.');
        }*/
    }

    getOldGames();
  })

  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Jogos Antigos
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    Clique no jogo do dia que você quer jogar:
                </Text>
                <Grid templateColumns='repeat(2, 1fr)' gap={3} marginY={3}>
                    {[...Array(number).keys()].map((el, idx) => {
                        currGameDate.setDate(today.getDate() - (idx + 1));
                        return (
                            <GridItem w='100%'>
                                <Text fontSize="xs">
                                    {currGameDate.toLocaleDateString('pt-BR')}
                                </Text>
                                <Link href={`/old/${number-idx}`}>
                                    <Button leftIcon={<MdMovieFilter />}>Jogo {'#'}{number-idx}</Button>
                                </Link>
                            </GridItem>
                        )
                    })}
                </Grid>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default OldGamesModal;